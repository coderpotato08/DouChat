import { createUidV4 } from "./uuid-helper";

export const getQuery = () => {
  const urlParams = new URLSearchParams(window.location.search);  
  const params: Record<string, any> = {};  
  for (let param of urlParams.entries()) {  
      params[param[0]] = param[1];  
  }  

  return params; 
}

export const formLayout = (labelSpan: number, wrapperSpan: number) => {
  return {
    labelCol: { span: labelSpan },
    wrapperCol: { span: wrapperSpan },
  }
}

export const textFormat = (content: string): string => {
  // content 即粘贴过来的内容(html 或 纯文本), 将样式清除
  if (content == '' && !content) return ''
  let str = content;
  str = str.replace(/<xml>[\s\S]*?<\/xml>/ig, '')
  str = str.replace(/<style>[\s\S]*?<\/style>/ig, '')
  str = str.replace(/<\/?[^>]*>/g, '')
  str = str.replace(/[ | ]*\n/g, '\n')
  str = str.replace(/&nbsp;/ig, '')
  str = str.replace(/<([a-z]+?)(?:\s+?[^>]*?)?>\s*?<\/\1>/, '')
  str = str.trim();
  str = str.replace(/\n\s*/g, '<br/>')
  str = str.replace(/<p><br><br><\/p><p><br><\/p>/, '')
  return str;
}

export const removeExtraHtml = (content: string): string => {
  // 取出输入框中复制黏贴出来的html 中 样式，meta标签
  if (content == '' && !content) return ''
  let str = content;
  return str
    .replace(/\sstyle="([^"]*)"/g,'')
    .replace(/<meta[^>]*>/g, "")
}

export const base64ToImageFile = <T extends string>(base64: T): {file: File, key: T} => {
  let arr = base64.split(",");
  let mime = arr[0].match(/:(.*?);/)![1];
  let type = mime.match(/image\/(.+)/)![1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
 
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return {
    key: base64,
    file: new File([u8arr], `${createUidV4()}.${type}`, { type: mime }),
  };
}

// export const handlePaste = (e: any) => {
//   e.preventDefault();
//   let clp = (e.originalEvent || e).clipboardData
//   const dtItems = [...clp.items];
//   const selection = window.getSelection();  
//   const range = selection!.getRangeAt(0);
//   range.deleteContents();
//   let text = ""
//   const imgs: any[] = [];
//   if(dtItems.some((it: DataTransferItem) => it.type.indexOf("html") > -1)) {
//     text = clp.getData('text/html') || '';
//     if (text) {
//       const parent = document.createElement('div');
//       parent.innerHTML = removeExtraHtml(text);
//       const nodes = parent.childNodes;
//       for (let i = nodes.length - 1; i >= 0 ; i--) {  
//         const node = nodes[i]
//         if(node.nodeName === 'IMG') {
//           transformUrlToFile((node as HTMLImageElement).src);
//           (node as HTMLImageElement).style.width = '45%'
//         }
//         setTimeout(() => {
//           range.insertNode(node)
//           range.setStartAfter(node)
//         }, i * 10)
//       }
//     }
//   } else if (dtItems.some((it: DataTransferItem) => it.type.indexOf("image") > -1)) {
//     const imgItems = dtItems.filter((item: DataTransferItem) => item.type.indexOf("image") > -1);
//     const blob = imgItems[0]!.getAsFile();
//     const imgEle = document.createElement('img');
//     const srcUrl = URL.createObjectURL(blob)
//     imgs.push(blob)
//     imgEle.src = srcUrl;
//     imgEle.style.width = '45%'
//     imgEle.alt = 'insert paste image';
//     range.insertNode(imgEle);
//   } else {
//     text = clp.getData('text/plain');
//     range.insertNode(document.createTextNode(text));
//   }
//   return imgs
// }