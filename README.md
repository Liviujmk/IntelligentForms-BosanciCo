
# Intelligent Forms - Assist Tech Challenge 2023

Intelligent Forms is a web app used to create form templates.
The created forms have a 'scan-document' feature that allows to autofill the fields with data from the scanned document.

## 
The app is created with React, Typescript, NodeJs and Express.\
Azure Form Recognizer is the tool used to extract data from uploaded documents. 



## DEMO
The app is published online with Azure and Netlify.

You can try all the available features by clicking one of the links below.You can create an account or use the demo account that already has forms you can test 

username='demo@gmail.com'\
password='123456'

[DEMO-Azure](https://zealous-pebble-085bc8303.2.azurestaticapps.net/)\
[DEMO-Netlify](https://frontend--gentle-figolla-3ef08d.netlify.app/)

## Authors

- [Laur Gabor](https://www.github.com/laurgabor) -  UI/UX design and Frontend
- [Catalin Mitrofan](https://www.github.com/mitrogun) - Frontend
- [Liviu Mitrofan](https://www.github.com/Liviujmk) - Full-Stack 
- [Alin Tanasa](https://www.github.com/AllanT12) - Backend



## Features

### Authenticated users 

#### Create form

- The user is able to create a form in his account
- The user is able to add multiple dynamic fields and multiple sections in a Form.
- For any dynamic field, the user can configure a label, a Placeholder Keyword and if it’s Mandatory or not. 
- For any dynamic field, the user can set one of the types: Text/Number/Decimal/Date/Single-choice/Multiple-choice

#### Generate QR-code
- For any form, the user can generate a QR-code to make it easily accessible

#### Submissions
- For any given submission, the user is able to generate a PDF with the form content, filled with the data submitted in the form. 

### Non-Authenticated users 

#### Fill form
- User is able to upload the picture of a document and the system is able to extract data from it and automatically fill some of the fields from the form
- User is able to scan the picture of a Romanian Id Card, Passport, Romanian Vehicle Identity Card and Romanian Birth Certificate(This are the only ones trained so far).




