from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)


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

        print("Name:", name)
        print("Email:", email)
        print("Password:", password)
        print("Location:", location)

        # Temporary
        return redirect(url_for("home"))

    return render_template("sign_in.html")


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