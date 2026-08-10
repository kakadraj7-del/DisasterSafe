import os
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

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
# HOME PAGE
# =========================

@app.route("/")
def home():
    return render_template("index.html")


# =========================
# SIGN IN PAGE
# =========================

@app.route("/sign-in", methods=["GET", "POST"])
def sign_in():

    if request.method == "POST":

        name = request.form.get("name")
        email = request.form.get("email")
        password = request.form.get("password")
        location = request.form.get("location")

        # Create new user
        new_user = User(
            name=name,
            email=email,
            password=password,
            location=location
        )

        db.session.add(new_user)
        db.session.commit()

        print("User saved successfully!")

        return redirect(url_for("home"))

    return render_template("sign_in.html")


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
# CREATE DATABASE TABLES
# =========================

with app.app_context():
    db.create_all()


# =========================
# RUN APPLICATION
# =========================

if __name__ == "__main__":
    app.run(debug=True)