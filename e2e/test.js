module.exports = {
  'Test Pagination': function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('.pagination-forward')
      .assert.not.elementPresent('.pagination-back')
      .assert.visible('input')
      .assert.attributeContains('input', 'value', '1')
      .click('.pagination-forward')
      .waitForElementVisible('.pagination-back')
      .assert.attributeContains('input', 'value', '2')
      .click('.pagination-back')
      .assert.attributeContains('input', 'value', '1')
      .assert.not.elementPresent('.pagination-back')
      .clearValue('input')
      .setValue('input', '50')
      .click('button')
      .assert.not.elementPresent('.pagination-forward')
  }
}