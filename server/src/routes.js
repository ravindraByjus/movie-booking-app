const express = require("express");
const Movie = require("./models/Movie");

const router = express.Router();

module.exports = function(){
    router.get('/getMovies/:searchValue', async (req, res) => {
        const { searchValue } = req.params;
        const moviesData = await Movie.find({title:searchValue});
        console.log(moviesData);
        return res.send(moviesData);
    });
    
    router.post('/addMovie', async(req,res) => {
        const {title,year,poster,imdbId,type} = req.body;
        const flag = await Movie.find({imdbId:imdbId});
        console.log(flag)

        if(flag.length == 0){
            const movie = new Movie({ 
                title,
                year,
                poster,
                imdbId,
                type
            });
            await movie.save();
            res.json({message:`Movie added successfully`});
        }
        else {
            res.json({message:`Movie already exists`})
        }
        
    });

    router.delete('/deleteMovie/:imdbId', async (req, res) => {
        const { imdbId } = req.params;

        await Movie.deleteOne({imdbId:imdbId});
        res.json({message:`Movie deleted successfully`});
    });

    router.put('/UpdateMovie/:imdbId', async(req,res) => {
        let objForUpdate = {}
        if (req.body.title) objForUpdate.title = req.body.title;
        if (req.body.year) objForUpdate.year = req.body.year;
        if (req.body.type) objForUpdate.type = req.body.type;
        if (req.body.poster) objForUpdate.poster = req.body.poster;

        const {imdbId} = req.body;
        //console.log({title,year,poster,type})

        await Movie.updateOne({imdbId}, { $set: objForUpdate })
        res.json({message:`Movie Updated successfully`});

    });

    return router;
}