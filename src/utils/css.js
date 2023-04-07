export const toRem = (input, rootSize = 16) => `${input / rootSize}rem`;

export const CSS_RESET = `
  html {
    box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
   box-sizing: inherit;
  }
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  pre,
  blockquote,
  figure,
  img,
  hr {
   margin: 0;
   padding: 0;
  }
  ul {
    margin: 0;
  }
  
  embed,
  iframe,
  img,
  object,
  video {
   display: block;
   max-width: 100%;
  }
  
  table {
   table-layout: fixed;
   width: 100%;
  }
  
  [hidden] {
   display: none;
  }
  
`;

export const CSS_COMMON = `

  /*----------------------height----------------------*/
  .h-20 {
    height: 20px;
  }

  .h-25 {
    height: 25px;
  }

  .h-30 {
    height: 30px;
  }

  .h-45 {
    height: 45px;
  }

  .h-50 {
    height: 50px;
  }

  .h-65 {
    height: 65px;
  }

  .h-100 {
    height: 100px;
  }
  .h-110 {
    height: 110px;
  }
  .h-full {
    height:100%;
  }

  /*----------------------width----------------------*/
  .w-10{
    width: 10px;
  }
  .w-20{
    width: 20px;
  }
  .w-50{
    width: 50px;
  }
  .w-110 {
    width: 110px;
  }
  .w-250 {
    width: 250px;
  }
  .w-174 {
    width: 174px;
  }
  .w-100 {
    width: 100%;
  }

  .w-half {
    width: 50%;
  }
  .w-full {
    width: 100%;
  }

  /*----------------------min-width----------------------*/
  .mw-10{
    min-width: 10px !important;
  }

  /*----------------------padding----------------------*/
  
  .p-5 {
    padding: 5px;
  }

  .p-10 {
    padding: 10px;
  }

  .p-t-30 {
    padding-top: 30px;
  }

  .p-t-26 {
    padding-top: 26px;
  }

  .pt-20 {
    padding-top: 20px;
  }

  .p-0 {
    padding: 0 !important;
  }
  /*----------------------font-weight----------------------*/
  .fw-semi-bold {
    font-weight: 600;
  }
  .fw-medium {
    font-weight: 500;
  }

  .fw-bold {
    font-weight: 600;
  }

  .fw-400 {
    font-weight: 400;
  }
  .fw-500 {
    font-weight: 500;
  }
  .fw-600 {
    font-weight: 600;
  }

  /*----------------------font-size----------------------*/

  .size-10 {
    font-size: 10px;
  }

  .size-12 {
    font-size: 12px;
  }
  
  .size-14 {
    font-size: 14px;
  }
  
  .size-16 {
    font-size: 16px;
  }

  .size-18 {
    font-size: 18px;
  }

  .size-20 {
    font-size: 20px;
  }
  
  .size-28 {
    font-size: 28px;
  }

  .size-30 {
    font-size: 28px;
  }

  /*----------------------margin----------------------*/
  .mlr-5 {
    margin: 0 5px;
  }
  
  .mlr-10 {
    margin: 0 10px;
  }
  .mt-35 {
    margin-top: 35px;
  }

  .mt-30 {
    margin-top: 30px;
  }
  .mt-20 {
    margin-top: 20px;
  }
  .mt-5 {
    margin-top: 5px;
  }
  .mt-10 {
    margin-top: 10px;
  }
  .mt-15 {
    margin-top: 15px;
  }

  .mb-15 {
    margin-bottom: 15px;
  }

  .mb-16 {
    margin-bottom: 16px;
  }

  .mb-5 {
    margin-bottom: 5px;
  }

  .mb-10 {
    margin-bottom: 10px;
  }

  .ml-5 {
    margin-left: 5px; 
  }
  .ml-7 {
    margin-left: 7px; 
  }
  .ml-10 {
    margin-left: 10px; 
  }
  .ml-15 {
    margin-left: 15px; 
  }
  .ml-20 {
    margin-left: 20px;
  }
  .ml-40 {
    margin-left: 40px;
  }

  .mr-10 {
    margin-right: 10px; 
  }
  .mr-20 {
    margin-right: 20px;
  }
  .mr-40 {
    margin-right: 40px;
  }

  .mb-24 {
    margin-bottom: 24px;
  }

  .mb-5 {
    margin-bottom: 5px;
  }

  .mb-15 {
    margin-bottom: 15px;
  }

  .mb-20 {
    margin-bottom: 20px;
  }

  .mt-24 {
    margin-top: 24px;
  }

  .mb-30 {
    margin-bottom: 30px;
  }

  .mb-40 {
    margin-bottom: 40px;
  }

  .mt-45 {
    margin-top: 45px;
  }

  .mt-50 {
    margin-top: 50px;
  }

  .mb-50 {
    margin-bottom: 50px;
  }

  .mb-100 {
    margin-bottom: 100px;
  }

  /*----------------------display----------------------*/

  .d-block {
    display:block;
  }

  .d-none {
    display:none;
  }

  .d-inline-flex {
    display: inline-flex;
  }

  .disabled-field {
    pointer-events: none;
  }

  .d-hidden {
    visibility: hidden;
    pointer-events: none;
    *  {
      visibility: hidden;
      pointer-events: none;
    }
  }

  /*----------------------flex----------------------*/
  .d-flex {
    display: flex;
  }
  .flex {
    display: flex;
  }
  .column {
    flex-direction: column;
  }

  .space-between {
    justify-content:space-between;
  }

  .flex-1 {
    flex: 1;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-end {
    align-items:flex-end;
    justify-content:flex-end;
  }

  .flex-column {
    flex-direction:column;
  }

  .flex-row-reverse {
    flex-direction: row-reverse;
  }

  .flex-center-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .flex-wrap {
    flex-wrap: wrap;
  }
  
  .align-items-center {
    align-items: center;
  }

  .align-items-stretch {
    align-items: stretch;
  }

  .align-items-end {
    align-items: flex-end;
  }

  .justify-content-between {
    justify-content: space-between;
  }

  .justify-content-center {
    justify-content: center
  }

  .justify-content-end {
    justify-content: flex-end;
  }

  .flex-auto {
    flex: 1 1 auto;
  }

  .justify-self-end	{
    justify-self: end;
  }

  .flex-around-nowrap {
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
  }

  /*----------------------text----------------------*/

  .text-center {
    text-align: center
  }

  .text-end {
    text-align: end
  }

  .text-left {
    text-align:left;
  }

  .text-right {
    text-align:right;
  }

  .text-underline {
    text-decoration: underline;
  }
  
  .text-uppercase {
    text-transform: uppercase;
  }

  .text-pre-line {
    white-space: pre-line;
  }

  .text-pre-wrap {
    white-space: pre-wrap;
  }

  .hover-underline {
    &:hover {
      text-decoration: underline;
    }
  }

  /*----------------------position----------------------*/

  .position-relative {
    position: relative;
  }

  .position-absolute {
    position: absolute;
  }

  /*----------------------other----------------------*/

  .object-contain {
    object-fit: contain
  }

  .pointer {
    cursor: pointer
  }

  /*----------------------opacity----------------------*/

  .opacity-05 {
    opacity: 0.5
  }

  .opacity-06 {
    opacity: 0.6
  }
  /*----------------------Right----------------------*/
  .r-0 {
    right: 0
  }
  .r-5 {
    right: 5px
  }
  /*----------------------Top----------------------*/
  .t-38{
    top: 38px;;
  }

  .t-150{
    top: 150px;
  }
  /*----------------------Border----------------------*/
  .border-radius{
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .radius-50{
    border-radius: 50%;
  }
  .border-circle{
    border: 2px dashed #6852D3;
    border-radius: 50%;
    -moz-border-radius:50%;
    -webkit-border-radius: 50%;
  }
  /*----------------------Z-Index----------------------*/
  .z-index-2{
    z-index: 2;
    }
  /*----------------------Background-Color----------------------*/
  .bc-primary{
    background-color: #6852D3 !important;,
  }
  /*----------------------Color----------------------*/
  .back-color{
    color: #000000 !important;,
  }
  /*----------------------Scroll----------------------*/
  .isScroll {
    overflow-x: scroll;
  }
  /*----------------------Scroll-hidden----------------------*/
  .scroll-hide {
    overflow-x: hidden;
  }
`;
