"use strict";
const zip1 = document.querySelector('#zip1');
const zip2 = document.querySelector('#zip2');
const prefectures = document.querySelector('select[name="prefectures"]');
const city = document.querySelector('#city');
const address = document.querySelector('#address');
const button = document.querySelector('input[type="button"]');
const map = document.querySelector('iframe');
const msg = document.querySelector('.msg');
let i = 0;

let url = 'https://zipcloud.ibsnet.co.jp/api/search?zipcode=';

button.addEventListener('click', () => {
  console.log(zip1.value + zip2.value);
  let zipurl = url + zip1.value + zip2.value;
  console.log(zipurl);

  fetch(zipurl)
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.status === 400) {
        if (data.message.includes("桁数が不正")) {
          msg.innerHTML = '「郵便番号」の桁数が不正です';
        } else if (data.message.includes("数字以外の文字が指定されています")) {
          msg.innerHTML = '「郵便番号」に数字以外の文字が指定されています。';
        }
      } else if (data.results === null) {
        msg.innerHTML = '存在しない郵便番号です。';
      } else {
        console.log(data);
        console.log(data.results[0].address1 + data.results[0].address2 + data.results[0].address3);
        msg.innerHTML = '';
        prefectures.value = data.results[0].address1;
        city.value = data.results[0].address2 + data.results[0].address3;
        address.addEventListener('input', () => {
          map.src = `https://maps.google.co.jp/maps?output=embed&q=${data.results[0].address1}${data.results[0].address2}${data.results[0].address3}${address.value}`;
        });
        map.src = `https://maps.google.co.jp/maps?output=embed&q=${data.results[0].address1}${data.results[0].address2}${data.results[0].address3}`;
      }
    });
});

address.addEventListener('input', () => {
  map.src = `https://maps.google.co.jp/maps?output=embed&q=${prefectures.value}${city.value}${address.value}`;
});
