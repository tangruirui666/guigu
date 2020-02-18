import React from 'react'
import './index.less'
export default function LinkButton(props){
    //函数接受一个props来传递属性
    return <button {...props} className="linkButton"></button>
}