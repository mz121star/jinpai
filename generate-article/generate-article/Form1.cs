using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Windows.Forms;
using Newtonsoft.Json;

namespace generate_article
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            
            var html = htmlTextBox1.Text;
           
            Regex regex = new Regex("<!DOCTYPE.*</HTML>", RegexOptions.Multiline);
            html = Regex.Replace(html, @"<!DOCTYPE[.\s\S]*</HEAD>", "");
            html = html.Replace("<BODY>", "");
            html = html.Replace("</BODY>", "");
            html = html.Replace("</HTML>", "");

            html = html.Replace("\"", "'");
            html = Regex.Replace(html, @"\s+$", "");
             html = Regex.Replace(html, @"^\s+", "");
             html = Regex.Replace(html, @"\s+^", "");
             html = Regex.Replace(html, @"\r\n", "");
            var content = "{\"title\": \"{0}\" ,\"content\":\"{1}\"}";
            var result = String.Format("\"title\" : \"{0}\" ,\"content\":\"{1}", textBox1.Text, html);
            result = "{"+result+"\"}";
            


            FileStream fs = new FileStream(textBox2.Text+"\\"+textBox3.Text+".json", FileMode.Create);
            //获得字节数组
            byte[] data = new UTF8Encoding().GetBytes(result);
            //开始写入
            fs.Write(data, 0, data.Length);
            //清空缓冲区、关闭流
            fs.Flush();
            fs.Close();


            var json = " , '" + textBox3.Text + "': function () { SetContentPage(\"" + textBox3.Text + ".json\");}";
            
            FileStream fs2 = new FileStream(textBox2.Text + "\\txt.json", FileMode.Append);
            //获得字节数组
            byte[] data2 = new UTF8Encoding().GetBytes(json);
            //开始写入
            fs2.Write(data2, 0, data2.Length);
            //清空缓冲区、关闭流
            fs2.Flush();
            fs2.Close();
 
        }
        public class Article
        {
            public string title { get; set; }
            public string content { get; set; }
        }
        private void btn_load_Click(object sender, EventArgs e)
        {
            openFileDialog1.Filter = "Js|*.json|所有文件(*.*)|*.*";
            openFileDialog1.InitialDirectory = textBox2.Text;
            openFileDialog1.RestoreDirectory = true;
            DialogResult result = openFileDialog1.ShowDialog();
            if (result == DialogResult.OK)
            {
                string aa = openFileDialog1.FileName;
                StreamReader sr = new StreamReader(@aa);
                string duqu;
                duqu = sr.ReadToEnd();
                var article = JsonConvert.DeserializeObject<Article>(duqu);

                htmlTextBox1.Text = article.content;
                textBox1.Text = article.title;
                textBox3.Text = System.IO.Path.GetFileName(aa);

            }

            
        }
    }
}
