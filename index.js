const program = require('commander')
const https = require('https');
const download = require('image-downloader');

program
  .version('0.0.1')
  .description('This is a reddit cli in case you want some entertainment while you are coding at work. Trust me, no one will notice!')

program
  .command('trending')
  .description('Expose the 5 most popular subreddits in the internet.')
  .action(() => {
    https.get('https://www.reddit.com/r/Trending/.json', (res) => {
      var respuesta = ''
      res.on('data', (chunk) => {
        respuesta += chunk.toString();
      })
      res.on('end', () => {
        for(var i = 0; i <= 5; i++){
          console.log('*' + JSON.parse(respuesta)['data']['children'][i.toString()]['data']['title'])
          console.log('     ' + JSON.parse(respuesta)['data']['children'][i.toString()]['data']['url'])
        }
      })
    })
  })

  program
  .command('top <subreddit>')
  .description('Expose the top post in the corresponding subreddit. Look for the meme in the images folder!')
  .action((subreddit) => {
    var link = "https://www.reddit.com/r/" + subreddit + "/top/.json"
    https.get((link), (res) => {
      var respuesta = ''
      res.on('data', (chunk) => {
        respuesta += chunk.toString();
      })
      res.on('end', () => {
        console.log('*' + JSON.parse(respuesta)['data']['children']['0']['data']['title'])
        console.log('     ' + JSON.parse(respuesta)['data']['children']['0']['data']['url'])
        var options = {
          url: JSON.parse(respuesta)['data']['children']['0']['data']['url'],
          dest: './images'
        }
        download.image(options)
      })
    })
  })

  program
  .command('new <subreddit>')
  .description('Expose the newest post in the corresponding subreddit. Look for the meme in the images folder!')
  .action((subreddit) => {
    var link = "https://www.reddit.com/r/" + subreddit + "/new/.json"
    https.get((link), (res) => {
      var respuesta = ''
      res.on('data', (chunk) => {
        respuesta += chunk.toString();
      })
      res.on('end', () => {
        console.log('*' + JSON.parse(respuesta)['data']['children']['0']['data']['title'])
        console.log('     ' + JSON.parse(respuesta)['data']['children']['0']['data']['url'])
        var options = {
          url: JSON.parse(respuesta)['data']['children']['0']['data']['url'],
          dest: './images'
        }
        download.image(options)
      })
    })
  })

program.parse(process.argv);

module.exports = () => {
}


