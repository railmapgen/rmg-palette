module.exports = app => {
    app.use('/rmg-palette/info.json', (req, res) => {
        res.send({
            component: 'rmg-palette',
            version: '9.9.9',
            environment: 'DEV',
            instance: 'localhost',
        });
    });
};
