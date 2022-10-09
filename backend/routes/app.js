const router = require('express').Router();
const Color = require('../models/colorpicker');

router.post('/addcolor', async (req, res) => {
    try {
        const { name, color } = req.body;
        const list = new Color({
            name, color
        })
        const savedlist = await list.save()
        console.log(savedlist)
        res.status(200).json(savedlist)
    } catch (error) {
        console.log("Error from Post Catch", error)
        res.status(500).json(error)
    }
})

router.get('/getcolor', async (req, res) => {
    try {
        const lists = await Color.find();
        res.status(200).json(lists)
    } catch (error) {
        console.log("Error from get catch", error);
        res.status(500).json(error)
    }
})

router.put("/edit/:id", async (req, res) => {
    try {
        const { name, color } = req.body;
        const newList = {};
        if (name) { newList.name = name };
        if (color) { newList.color = color };
        let list = await Color.findById(req.params.id);
        list = await Color.findByIdAndUpdate(req.params.id, { $set: newList }, { new: true })
        res.status(200).json({ list })
    } catch (error) {
        console.log("Error", error)
        res.status(500).json(error)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        let color = await Color.findById(req.params.id);
        color = await Color.findByIdAndDelete(req.params.id)
        res.status(200).json({ "success": "updated successfully", color })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router