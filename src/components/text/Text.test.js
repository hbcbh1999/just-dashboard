import should from 'should' // eslint-disable-line no-unused-vars
import TextComponent from './Text'
import assert from 'assert'
var jsdom = require('mocha-jsdom')

describe('Text component', function() {
  jsdom({'useEach': true})

  const get_render_function = (component_args) => {
    const bind = TextComponent(component_args)
    const d3 = require('d3')
    const render = bind(d3.selection())
    return { render, d3 }
  }

  it('should throw on invalid tag name', () => {
    (() => {TextComponent({'tagName': 'foo bar'})()()})
      .should.throw('Argument \'tagName\' is invalid')
  })

  it('text is rendered', function() {
    const { render, d3 } = get_render_function({'tagName': 'span'})
    render('Hello World from TextComponent')
    assert.equal(d3.selection().select('span').text(), 'Hello World from TextComponent')
  })

  it('update function updates text', function() {
    const { render, d3 } = get_render_function({'tagName': 'span'})
    render('Hello World from TextComponent')
    render('Second version')
    assert.equal(d3.selection().select('span').text(), 'Second version')
  })

})
