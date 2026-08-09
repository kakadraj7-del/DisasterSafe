from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/")
def home():
    return redirect(url_for("sign_in"))

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

        return redirect(url_for("home_page"))

    return render_template("sign_in.html")


if __name__ == "__main__":
    app.run(debug=True)