from flask import Flask, render_template

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

@app.route("/sign-in")
def sign_in():
    return render_template("sign_in.html")


# =========================
# PROFILE PAGE
# =========================

@app.route("/profile")
def profile():
    return render_template("profile.html")


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


@app.route("/preparedness-info")
def preparedness_info():
    return render_template("preparedness_info.html")


# =========================
# RUN APPLICATION
# =========================

if __name__ == "__main__":
    app.run(debug=True)