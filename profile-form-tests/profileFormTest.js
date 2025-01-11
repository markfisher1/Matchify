describe('Profile Form Tests', () => {
    before(() => {
      browser.url('http://localhost:3000');
    });
  
    it('should successfully submit the form with valid inputs', () => {
      $('#name').setValue('John Doe');
      $('#age').setValue(30);
      $('#gender').selectByVisibleText('Male');
      $('#location').setValue('New York');
      $('#interests').setValue('Reading, Hiking');
      const filePath = './validImage.png'; // Path to a valid image
      const remoteFilePath = browser.uploadFile(filePath);
      $('#profilePicture').setValue(remoteFilePath);
      $('button[type="submit"]').click();
      expect($('#successMessage').isDisplayed()).toBe(true);
    });
  
    it('should show error for missing mandatory fields', () => {
      $('button[type="submit"]').click();
      expect(browser.getAlertText()).toContain('Please fill out all fields.');
    });
  
    it('should show error for invalid image types', () => {
      $('#name').setValue('John Doe');
      $('#age').setValue(30);
      $('#gender').selectByVisibleText('Male');
      $('#location').setValue('New York');
      $('#interests').setValue('Reading, Hiking');
      const filePath = './invalidFile.txt'; // Path to an invalid file
      const remoteFilePath = browser.uploadFile(filePath);
      $('#profilePicture').setValue(remoteFilePath);
      $('button[type="submit"]').click();
      expect(browser.getAlertText()).toContain('Please upload a valid image file.');
    });
  });
  