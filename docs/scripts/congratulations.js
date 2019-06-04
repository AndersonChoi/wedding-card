var isWonyoungAlive = true;
var isSominAlive = true;

setTimeout(() => {
  console.log(
    'Wonyoung and Somin met and got married. And they lived happily ever after...'
  );  
}, 1500)

var marriageCheck = setInterval(() => {
  if (!isWonyoungAlive && !isSominAlive) clearInterval(marriageCheck);

  try {
    if (!isSominAndWonyoungTogether()) throw new Error('IMPOSSIBLE');

    console.log('');
    console.log('and after...');
  } catch (err) {
    console.error(err);
    if (err.message === 'IMPOSSIBLE') {
      console.log('exploding due to fatal error');
      process.exit(1);
    }
  }
}, 2000);

function isSominAndWonyoungTogether() {
  return true
}
