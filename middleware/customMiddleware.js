const helloMiddleware = (req, res, next) => {
    console.log("Hello I am middleware");
    next();
}

const getDate = (req, res, next) => {
    req.requestTime = new Date();
    req.user = "response from db for findByPk"
next();
}

const pirate = (req,res, next) => {
    res.send("I've taken over the response! Someone made an error and we are not continuing the route as planned")
}

module.exports = {
    helloMiddleware,
    getDate,
    pirate
};