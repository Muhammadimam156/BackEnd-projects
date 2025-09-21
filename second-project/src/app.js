const express = require(`express`)
const { connectDB } = require("./config/config")
const { User } = require("./model/user")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express()
const validator = require('validator')
const bcrypt = require(`bcrypt`)

app.use(express.json())
app.use(cookieParser());


app.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, password, email } = req.body
        // console.log(firstName, lastName, password, email );


        if (!firstName || !lastName) {
            throw new Error('invalid name')
        }
        if (!validator.isEmail(email)) {
            throw new Error('wrong email')
        }
        const hashPasssword = await bcrypt.hash(password, 10)
        console.log(hashPasssword)

        const user = await User({
            firstName,
            lastName,
            email,
            password: hashPasssword
        })
        await user.save()
        const token = jwt.sign({ id: user._id }, "87878787", { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true });
        res.send({ msg: "Signup successful ✅", token, userId: user._id });



    } catch (error) {
        res.status(400).send({
            message: "signup error",
            error: error.message

        })
    }

})

app.post(`/login`, async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error("user not found")
        }
        console.log(user.password);

        const isMatachedPassword = await bcrypt.compare(password, user.password)
        if (!isMatachedPassword) {
            throw new Error("Invalid credentials")
        }
        const token = jwt.sign({ id: user._id }, "87878787", { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true });
        res.send({ msg: "Signup successful ✅", token, userId: user._id });
    } catch (error) {
        res.status(400).send({
            message: "login error",
            error: error.message
        })
    }

})
 app.post("/logout", (req, res) => {
  res.clearCookie("token"); // cookie delete
  res.json({ msg: "Logout successful ✅" });
});


connectDB().then(() => {
    console.log(`database connected`);
    app.listen(`3000`, () => {
        console.log(`server is running in port 3000 `);
    })

}).catch((error) => {
    console.log(error, "DATABASE is not connected !")
})

