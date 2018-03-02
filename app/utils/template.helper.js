import pdf from 'html-pdf';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';


const htmlTemplate = templateName => params => new Promise((resolve, reject) => {
  fs.readFile(path.resolve(__dirname, `../templates/${templateName}.html`), { encoding: 'utf-8' }, (err, file) => {
    if (err) { reject(err); }

    Handlebars.registerHelper('priceFixed', price => price.toFixed(2));

    Handlebars.registerHelper('propValue', prop => (prop === 'Checked' ? 'Yes' : prop));

    const template = Handlebars.compile(file);
    const html = template(params);

    resolve(html);
  });
});

const PDF = html => (options = {}) => new Promise((resolve, reject) => {
  pdf.create(html, options).toBuffer((err, buffer) => {
    if (err) { reject(err); }

    resolve(buffer);
  });
});


export {
  htmlTemplate,
  PDF,
};
