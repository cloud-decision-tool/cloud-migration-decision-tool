import Document, { Head, Main, NextScript } from 'next/document'
// import { Layout } from 'antd';
//
// const { Header, Footer, Sider, Content } = Layout;
// import stylesheet from 'antd/dist/antd.min.css';
// import stylesheet from 'antd/lib/style/index.css';
// import style_grid from 'antd/lib/grid/style/index.css';
// import style_badge from 'antd/lib/badge/style/index.css';
// import style_menu from 'antd/lib/menu/style/index.css';
// import style_input from 'antd/lib/input/style/index.css';
// import "../node_modules/antd/dist/antd.min.css";
// import "/_next/static/styles/global.min.css";
// import global from "../styles/styles.js";
// import Navbar from './components/navbar';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
        <link rel="stylesheet" type="text/css" href="/static/styles/global.min.css" />
        <link rel="stylesheet" type="text/css" href="/static/styles/payment.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.4.0/antd.min.css" />
          <link href="https://fonts.googleapis.com/css?family=Montserrat:400,600,700" rel="stylesheet" />
        </Head>
        <body>


          {/*
            <style dangerouslySetInnerHTML={{ __html: stylesheet }} />

            <style dangerouslySetInnerHTML={{ __html: style_grid }} />
          <style dangerouslySetInnerHTML={{ __html: style_menu }} />
          <style dangerouslySetInnerHTML={{ __html: style_badge }} />
          <style dangerouslySetInnerHTML={{ __html: style_input }} />

          <style dangerouslySetInnerHTML={{ __html: style_badge }} />

          <style jsx>{global}</style>

          <Navbar />
          */}


          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
