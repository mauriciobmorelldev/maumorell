import {ImageResponse} from 'next/og';
export const alt='Maumorell — Diseño de páginas web y tiendas online';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%',height:'100%',background:'#131411',color:'#f3f1e9',padding:65}}><div style={{display:'flex',justifyContent:'space-between',fontSize:28}}><span>maumorell</span><span style={{color:'#c2f74f'}}>WEBS · TIENDAS ONLINE · PORTFOLIOS</span></div><div style={{display:'flex',flexDirection:'column',fontSize:88,fontWeight:700,lineHeight:1}}><span>Tu próxima web.</span><span style={{color:'#c2f74f'}}>La construimos.</span></div><span style={{fontSize:24}}>DISEÑO Y DESARROLLO WEB A MEDIDA</span></div>,size)}
