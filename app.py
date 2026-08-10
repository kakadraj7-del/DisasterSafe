import os

from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

app.secret_key = os.environ.get(
    "SECRET_KEY",
    "disastersafe-secret-key"
)


# =========================
# DATABASE CONFIGURATION
# =========================

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


# =========================
# USER TABLE
# =========================

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(150), nullable=False)


# =========================
# CREATE DATABASE TABLES
# =========================

with app.app_context():
    db.create_all()


# =========================
# HOME PAGE
# =========================

@app.route("/")
def home():
    return render_template("index.html")


# =========================
# SIGN IN / REGISTER PAGE
# =========================

@app.route("/sign-in", methods=["GET", "POST"])
def sign_in():

    if request.method == "POST":

        name = request.form.get("name")
        email = request.form.get("email")
        password = request.form.get("password")
        location = request.form.get("location")

        # Check if email already exists
        existing_user = User.query.filter_by(email=email).first()

        if existing_user:
            return "Email already registered. Please use a different email."

        # Create new user
        new_user = User(
            name=name,
            email=email,
            password=password,
            location=location
        )

        db.session.add(new_user)
        db.session.commit()

        # Remember the logged-in user
        session["user_id"] = new_user.id

        print("User saved successfully!")

        return redirect(url_for("home"))

    return render_template("sign_in.html")


# =========================
# PROFILE PAGE
# =========================

@app.route("/profile", methods=["GET", "POST"])
def profile():

    user_id = session.get("user_id")

    # User is not logged in
    if not user_id:
        return redirect(url_for("sign_in"))

    # Find logged-in user
    user = User.query.get(user_id)

    if not user:
        session.pop("user_id", None)
        return redirect(url_for("sign_in"))

    # Update email and location
    if request.method == "POST":

        email = request.form.get("email")
        location = request.form.get("location")

        # Check if another user already has this email
        existing_user = User.query.filter(
            User.email == email,
            User.id != user.id
        ).first()

        if existing_user:
            return "That email is already registered."

        user.email = email
        user.location = location

        db.session.commit()

        return redirect(url_for("profile"))

    return render_template("profile.html", user=user)


# =========================
# OTHER PAGES
# =========================

@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/weather")
def weather():
    return render_template("weather.html")


@app.route("/preparedness")
def preparedness():
    return render_template("preparedness.html")


@app.route("/guidelines")
def guidelines():
    return render_template("guidelines.html")


@app.route("/emergency-contacts")
def emergency_contacts():
    return render_template("emergency_contacts.html")


# =========================
# RUN APPLICATION
# =========================

if __name__ == "__main__":
    app.run(debug=True)

