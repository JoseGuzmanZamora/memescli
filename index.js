const program = require('commander')
const https = require('https');
const download = require('image-downloader');
const clear = require('clear');
const figlet = require('figlet');
const spin = require('clui').Spinner;

const status = new spin('Connecting to Reddit . . .');

program
  .version('1.1.0')
  .description(' - Reddit cli - WATCH MEMES AT WORK, just pretend you are coding!')

program
  .command('trending')
  .description('Exposes the 5 most popular subreddits in the internet.')
  .action(() => {
    status.start();
    https.get('https://www.reddit.com/r/Trending/.json', (res) => {
      var respuesta = ''
      res.on('data', (chunk) => {
        respuesta += chunk.toString();
      })
      res.on('end', () => {
        status.stop();
        clear()
        console.log(figlet.textSync('Trending', { horizontalLayout: 'full' }))
        for(var i = 0; i <= 5; i++){
          console.log('*' + JSON.parse(respuesta)['data']['children'][i.toString()]['data']['title'])
          console.log('     ' + JSON.parse(respuesta)['data']['children'][i.toString()]['data']['url'])
        }
      })
      res.on("error",(err) => {
        status.stop();
        Console.log("ERROR BUU :(")
        Console.log(err)
      })
    })
  })

  program
  .command('show <subreddit>')
  .option('-s --sort <order>', 'Choose sorting order')
  .description('Exposes and downloads the first meme in the subreddit.')
  .action((subreddit, cmd) => {
    status.start();
    if(cmd.sort && (cmd.sort == "top" || cmd.sort == "new" || cmd.sort == "rising" || cmd.sort == "controversial")){
      console.log("Sorting by " + cmd.sort)
      var link = 'https://www.reddit.com/r/' + subreddit + '/'+ cmd.sort.toString() +'/.json'
    }else{
      console.log("Sorting by top")
      var link = 'https://www.reddit.com/r/' + subreddit + '/top/.json'
    }
    https.get((link), (res) => {
      var respuesta = ''
      res.on('data', (chunk) => {
        respuesta += chunk.toString();
      })
      res.on('end', () => {
        status.stop();
        console.log('*' + JSON.parse(respuesta)['data']['children']['0']['data']['title'])
        console.log('     ' + JSON.parse(respuesta)['data']['children']['0']['data']['url'])
        var options = {
          url: JSON.parse(respuesta)['data']['children']['0']['data']['url'],
          dest: './'
        }
        download.image(options)
      })
      res.on("error",(err) => {
        status.stop();
        Console.log("ERROR BUU :(")
        Console.log(err)
      })
    })
  })

  program
  .command('makemelaugh <amount>')
  .option('-s --sort <order>', 'Choose sorting order')
  .description("Shows and downloads the amount of memes you want from the subreddit r/memes")
  .action((amount, cmd) => {
    status.start();
    if(cmd.sort && (cmd.sort == "top" || cmd.sort == "new" || cmd.sort == "rising" || cmd.sort == "controversial")){
      console.log("Sorting by " + cmd.sort)
      var link = 'https://www.reddit.com/r/memes/'+ cmd.sort.toString() +'/.json'
    }else{
      console.log("Sorting by top")
      var link = 'https://www.reddit.com/r/memes/top/.json'
    }
    https.get((link), (res) => {
      var respuesta = ''
      res.on('data', (chunk) => {
        respuesta += chunk.toString();
      })
      res.on('end', () => {
        status.stop();
        clear()
        console.log(figlet.textSync('HAHAHA', { horizontalLayout: 'full' }))
        for(var i = 0; i < amount; i++){
          console.log('*' + JSON.parse(respuesta)['data']['children'][i.toString()]['data']['title'])
        console.log('     ' + JSON.parse(respuesta)['data']['children'][i.toString()]['data']['url'])
        var options = {
          url: JSON.parse(respuesta)['data']['children'][i.toString()]['data']['url'],
          dest: './'
        }
        download.image(options)
        }
      })
      res.on("error",(err) => {
        status.stop();
        Console.log("ERROR BUU :(")
        Console.log(err)
      })
    })
  })

program.parse(process.argv);

module.exports = () => {
}


