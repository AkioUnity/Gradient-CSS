/* eslint-disable no-undef */
import React from 'react'

export default class AdComponent extends React.Component {
  componentDidMount () {
    const installGoogleAds = () => {
      const elem = document.createElement('script')
      elem.src =
        '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
      elem.async = true
      elem.defer = true
      document.body.insertBefore(elem, document.body.firstChild)
    }
    installGoogleAds();
    (adsbygoogle = window.adsbygoogle || []).push({})
  }

  render () {
    return (
      <ins className='adsbygoogle'
        style={{display: 'inline-block', width: '300px', height: '250px'}}
        data-ad-client='ca-pub-7318699538797156'
        data-ad-slot='9653487421'
        data-ad-format='auto' />
    )
  }
}
