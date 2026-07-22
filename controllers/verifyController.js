export function verify(req, res) {
    res.status(200).json({
        message: 'Authorized',
        user: req.user
    });
}
