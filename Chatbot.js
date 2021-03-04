const firebase= require('firebase');

const config = {
  apiKey: 'AIzaSyAve9SFpbBZeS40BMYwD4KNzMoht1SyxnI',
  authDomain: 'sanganaka-f8486.firebaseapp.com',
  databaseURL: "https://sanganaka-f8486.firebaseio.com",
  projectId: "sanganaka-f8486",
  storageBucket: "sanganaka-f8486.appspot.com",
  messagingSenderId: "891657383270",
  appId: "1:891657383270:web:8c5be227feed61ed8aeca7",
  measurementId: "G-VLFG4CWX78"
};
firebase.initializeApp(config);


module.exports = 
{

	ChatbotReply: async function(message)
	{
		// Bot's data
		const db = firebase.firestore();
		this.Bot_Age = 20;
		this.Bot_Name = "Iris";
		this.Bot_University = "JIIT Noida";
		this.Bot_Country = "India";
		// User data
		this.User_Name;
		// Message processing... 
		message= message.toLowerCase()

		if(message.indexOf("hi") > -1 || message.indexOf("hello") > -1 || message.indexOf("welcome") > -1 )
		{
			return "Hi!";
		} 
		else if(message.indexOf("age") > -1 && message.indexOf("your") > -1)
		{
			return "I'm " + this.Bot_Age;
		}
		else if (message.indexOf("how") > -1 && message.indexOf("are") && message.indexOf("you") > -1)
		{
			return "I'm fine ^_^"
		}
		else if(message.indexOf("where") > -1 && message.indexOf("live") && message.indexOf("you") > -1)
		{
			return "I live in " + this.Bot_Country;
		}
		else if(message.indexOf("name") > -1 && message.indexOf("my") > -1)
		{
			this.User_Name = message.substring(message.lastIndexOf(" ")+1, message.length)
			this.User_Name= this.User_Name[0].toUpperCase() + this.User_Name.substring(1,this.User_Name.length);
			return "Nice to meet you " + this.User_Name;
		}
		else if(message.indexOf("name") > -1 && message.indexOf("your"))
		{
			return "My name is " + this.Bot_Name;
		}
		else {
			var art = [];
			var speech="";
			await db.collection('articles').get().then((snapshot)=> {
				snapshot.docs.map((doc) => {
					message.split(" ").forEach((mess)=> {
						if(doc.data().topic.toLowerCase().indexOf(mess)+1) {
							art.push({
								link: doc.data().article_link,
								category: doc.data().category,
								content: doc.data().content,
								credits: doc.data().credits,
								id: doc.data().id,
								images: doc.data().images,
								interest: doc.data().interest,
								sub: doc.data().subBy,
								topic: doc.data().topic,
								videos: doc.data().videos
							})
						}
					})
				})
			}).then(()=>{
				console.log(art.length)
					if(art.length) {
						art.forEach((data)=>{
							speech=speech+"\n"+data.topic;
						})
					}
					else {
						speech= "Sorry, I didn't get it :( ";
					}
				}).then(()=> {
					if(art.length) {
						speech= "The fololowing articles found regarding that: -"+ speech;
					}
				})
			.catch((err)=> {
				console.log(err);
			})
			return speech;
		}
	}


};