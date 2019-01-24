const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');


// ===================
// App wide middleware
// ===================
const app = express();
app.use(bodyParser.json());

// NOTE:
// Include before other routes only for development
// to turn off CORS for localhost
app.options('*', cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// =============
// Dependencies.
// =============
const { User, History } = require('./sequelize')


// =============
// API endpoints
// =============
app.get('/api/hello', (req, res, next) => {
  res.send({ express: 'Hello From Express... is this shit really hooked up?' });
});

// create a user
app.post('/api/users', (req, res, next) => {
    User.create(req.body)
        .then(user => res.json(user))
})

// get all users
app.get('/api/users', (req, res, next) => {
    User.findAll().then(users => res.json(users))
})

// Upload a model and profile, then run slice.
// returns 2 links:  to download .makerbot and .gcode
app.post('/api/slice', cors(), (req, res, next) => {

    // const childProcess = require('child_process');
    // const runCommand = childProcess.spawn(
    //     'cd cl_sliceconfig_client && ./py_scripts/slice_a_file.py  -i ./test_assets/model.stl  -f ./test_assets/ -p ./test_assets/profile.json -u -t test_assets -v', 
    //     [], 
    //     { detach: true }
    //     );
    //     c.unref();

    // runCommand.on('exit', (code, signal) => {
    //     console.log('child process exited with ' + `code ${code} and signal ${signal}`);
    // });

    console.log('request body from slice call---->', req.body);

    // Spawns child process to run ported in cl_sliceconfig_client
    const exec = require('child_process').exec;
    const dependencyPath = './cl_sliceconfig_dependency';

    // (1) Stream files from local paths to somewhere on server and cache.
    //      model files -> slicer_files/input/models/
    //      profiles    -> slicer_files/input/profiles/
    // (2) 

    // Assemble command.
    const modelFilePath = './slicer_files/input/models/model.stl';
    const profileFilePath = './slicer_files/input/profiles/profile.json';
    const completedFilePath = './slicer_files/output/temp_cache';

    const cliCommand = "./py_scripts/slice_a_file.py  -i " + modelFilePath + " -f " + completedFilePath + " -p " + profileFilePath + " -u -v";

    const childProcess = exec(cliCommand, {cwd: dependencyPath});


    // Responses.
    childProcess.stdout.on('data', (data) => {
        console.log('stdout: ' + data);

        // Pipe progress through sockets?
        
    });
    childProcess.stderr.on('data', (data) => {
        console.log('stderr: ' + data);

        // Server response.
        // res.send({ error: 'Something went wrong.  STDERR !!', data: data });
    });
    childProcess.on('close', (code) => {
        console.log('closing code: ' + code);

        // Server response.
        // If success:
        if (code === 0) {        
            res.send({ downloadLink: 'https:://download.me' });
        } else {
            res.send({ error: 'Slice did not complete.  Something went wrong.', code: "exit code: " + code});
        }
    });
})

// // create a blog post
// app.post('/api/blogs', (req, res) => {
//     const body = req.body
//     // either find a tag with name or create a new one
//     const tags = body.tags.map(tag => Tag.findOrCreate({ where: { name: tag.name }, defaults: { name: tag.name }})
//                                          .spread((tag, created) => tag))
//     User.findById(body.userId)
//         .then(() => Blog.create(body))
//         .then(blog => Promise.all(tags).then(storedTags => blog.addTags(storedTags)).then(() => blog))
//         .then(blog => Blog.findOne({ where: {id: blog.id}, include: [User, Tag]}))
//         .then(blogWithAssociations => res.json(blogWithAssociations))
//         .catch(err => res.status(400).json({ err: `User with id = [${body.userId}] doesn\'t exist.`}))
// })

// // find blogs belonging to one user or all blogs
// app.get('/api/blogs/:userId?', (req, res) => {
//     let query;
//     if(req.params.userId) {
//         query = Blog.findAll({ include: [
//             { model: User, where: { id: req.params.userId } },
//             { model: Tag }
//         ]})
//     } else {
//         query = Blog.findAll({ include: [Tag, User]})
//     }
//     return query.then(blogs => res.json(blogs))
// })

// // find blogs by tag
// app.get('/api/blogs/:tag/tag', (req, res) => {
//     Blog.findAll({
//         include: [
//             { model: Tag, where: { name: req.params.tag } }
//         ]
//     })
//     .then(blogs => res.json(blogs))
// })


// ===============
// Fire up server.
// ===============
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
