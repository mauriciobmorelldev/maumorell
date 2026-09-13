import {ImageResponse} from 'next/og';
export const alt='Maumorell — Ideas que se vuelven digitales';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%',height:'100%',background:'#131411',color:'#f3f1e9',padding:65}}><div style={{display:'flex',justifyContent:'space-between',fontSize:28}}><span>maumorell✳</span><span style={{color:'#c2f74f'}}>DESARROLLO & ESTRATEGIA DIGITAL</span></div><div style={{display:'flex',flexDirection:'column',fontSize:94,fontWeight:700,lineHeight:1}}><span>Ideas que se vuelven</span><span style={{color:'#c2f74f'}}>digitales.</span></div><span style={{fontSize:24}}>NEXT.JS / MAGENTO / WOOCOMMERCE</span></div>,size)}
