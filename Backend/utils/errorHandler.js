export const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode;

    console.log(err);
    res.status(statusCode).json({
        message:err.message,
    })
}