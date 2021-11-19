import style, { css } from "styled-components";

function Appstyle() {
    return css`

    body {
      background: #f2f2f2 !important;
      font-family: 'Arimo', sans-serif !important;
    }
    .css-1oqqzyl-MuiContainer-root {
      padding-left: 0 !important;
      padding-right: 0 !important;
  }
    // .MuiPaper-root.MuiPaper-elevation.MuiPaper-elevation4.MuiAppBar-root.MuiAppBar-colorPrimary.MuiAppBar-positionFixed.mui-fixed.css-l94jix-MuiPaper-root-MuiAppBar-root{
    //    background:#04b6a7 !important;
    // }
    // .simplebar-content-wrapper .MuiBox-root.css-1dk38ps {
    //   background:#04b6a7;
    //   min-height: 92px;
    //   text-align: center;
    // }
    // MuiPaper-root.MuiPaper-elevation.MuiPaper-elevation4.MuiAppBar-root.MuiAppBar-colorPrimary.MuiAppBar-positionFixed .css-6lzitz-MuiPaper-root-MuiDrawer-paper{
    //   border:none
    // }
    h3.Logo-tx {
      color: #fff;
      text-align: center;
      display: inline-block;
      width: 100%;
      font-size: 33px;
      margin:0;
  }
  .logo-area {
    color: transparent;
  }
  .title-name {
    font-size: 23px;
  }
  .sub-tl {
    color: #666;
  }
  .log-time {
    color: #666;
    font-size: 12px;
    margin-top:5px;
  }
  .right-nav {
    text-align: center;
  }
  .right-nav h6 {
    line-height: 1;
  }
  svg.icons {
    width: 24px !important;
    height: 24px !important;
  }

  svg.icon-nav {
    font-size: 20px;
  }
  .calender-wdt #datepicker {
    width: 100% !important;
    max-width: 100%;
    border: none;
  }
  .calender-wdt .e-calendar .e-header.e-month, .e-bigger.e-small .e-calendar .e-header.e-month {
    padding: 28px 10px 20px 10px;
}
.calender-wdt .e-calendar .e-content.e-month td, .e-bigger.e-small .e-calendar .e-content.e-month td {
	height: 64px;
	padding: 2px;
}
span.e-input-group.e-control-wrapper.e-date-wrapper{
  border-color: rgba(145, 158, 171, 0.32) !important;
  border-radius: 8px  !important;
  padding: 11.5px 14px;
  border-width: 1px !important;
  font-size: 0.75em !important;
}

input.inputdesign.e-control.e-datepicker.e-lib.e-input.e-keyboard {
  font-size: 0.94rem !important;
}
span.e-input-group.e-control-wrapper.e-date-wrapper.e-valid-input input::after {
 background: #00AB55 !important;
}
.e-checkbox-wrapper .e-frame.e-check, .e-css.e-checkbox-wrapper .e-frame.e-check{
  background-color:  #00AB55 !important;
}
.e-upload.e-control-wrapper.e-lib.e-keyboard{
  border-color: rgba(145, 158, 171, 0.32) !important;
  border-radius: 8px  !important;
  border-width: 1px !important;
  font-size: 0.95em !important;
}
.e-checkbox-wrapper span.e-label{
  font-size: 0.95em !important;
}
svg.addtable {
  position: absolute;
  right: 42px;
  font-size: 22px;
  top: 15px;
}
input.e-input, textarea.e-input, .e-input-group, .e-input-group.e-control-wrapper{
  font-size: 0.95em !important;
  font-family: inherit !important;
  border-color: rgba(145, 158, 171, 0.32) !important;
  border-radius: 8px  !important;
  border-width: 1px !important;
  padding: 11.5px 14px;
}
.css-16d5wub-MuiFormHelperText-root.Mui-error {
  color: #FF4842;
  position: absolute !important;
  bottom: 61px !important;
}
#datepicker,#datepicker1{
  border:none !important;
}
// span.e-input-group.e-control-wrapper.e-date-wrapper {
//   width: 43px !important;
//   position: absolute;
//   opacity: 0;
// }
.right-nav.MuiBox-root.css-124nmgo {
  position: relative;
}

// header.MuiPaper-root span.e-input-group.e-control-wrapper.e-date-wrapper {
//   width: 77px !important;
//   position: absolute;
//   opacity: 0;
//   left: -1px;
// }
div#mui-p-11636-P-1 {
  overflow: scroll !important;
  height: 100vh !important;
}
.right-nav.calendr-icon .MuiButtonBase-root.MuiIconButton-root {
	color: #fff;
}
.upload-img .ant-upload.ant-upload-select.ant-upload-select-picture-card {
  width: 250px;
  height: 250px;
}
.upload-img .ant-upload-list-picture-card-container {
  width: 250px;
  height: 250px;
  margin: 0 17px 17px 0;
}
ul.list-group-left {
  display: inline-block;
  list-style-type: none;
}
ul.list-group-right {
  float: right;
  list-style-type: none;
}
li.list-group-item.list-group-item-primary {
  line-height: 39px;
}
ul.list-group-left li {
  font-weight: 500;
    font-size: 16px;
    color: #010114 !important;
}
ul.list-group-right li, .css-2z4psk-MuiTypography-root {
  color: #101052 !important;
}
.MuiListItemText-root.css-vt7cuc-MuiListItemText-root {
  color: #010114 !important;
}
  `;
    
}

export const AppstyleWrapperStyled = style.div`
${Appstyle};
`;