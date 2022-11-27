const workerpool = require('workerpool')
const kuromoji = require('kuromoji')

// 形態素解析をするための辞書を読み込む
kuromoji.builder({
  dicPath: 'node_modules/kuromoji/dict',
}).build((error, tokenizer) => {
  if (error) throw error

  // 文字列を受け取って形態素解析する関数を作成
  const tokenize = text => tokenizer.tokenize(text)

  // 関数を呼び出せるように公開する
  workerpool.worker({ tokenize })
})