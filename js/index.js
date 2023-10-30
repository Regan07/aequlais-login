const players=[
  {
      "name": "bilal",
      "age": "21",
      "gender": "male",
      "sportType": "indoor",
      "sport": "chess",
      "profile": "../assests/git.png",
      "file": "git.png"
  },
  {
      "name": "jervin",
      "age": "21",
      "gender": "male",
      "sportType": "indoor",
      "sport": "chess",
      "profile": "../assests/git.png",
      "file": "git.png"
  },
  {
      "name": "hasrath",
      "age": "21",
      "gender": "male",
      "sportType": "indoor",
      "sport": "chess",
      "profile": "../assests/git.png",
      "file": "git.png"
  },
  {
      "name": "regan",
      "age": "21",
      "gender": "male",
      "sportType": "outdoor",
      "sport": "cricket",
      "profile": "../assests/react.png",
      "file": "react.png"
  },
  {
      "name": "regan",
      "age": "13",
      "gender": "female",
      "sportType": "outdoor",
      "sport": "football",
      "profile": "../assests/react.png",
      "file": "react.png"
  },
  {
      "name": "asraf",
      "age": "13",
      "gender": "male",
      "sportType": "indoor",
      "sport": "batmitton",
      "profile": "../assests/react.png",
      "file": "react.png"
  }
]


let formState="create"
let selectedIndex="";
let selectedFile="";
let image="";
let formValidity=true;


                //for render players
                    const renderPlayers=(players)=>
                    {
                      document.getElementById("card-container").innerHTML=players.map((player,index)=>
                         {  return (`
                       <div class="card">
                           <div class="banner">                               
                               <div class="content-divider">
                                   <div class="banner-content">
                                         <img src="${player.profile}" />
                                         <p>Name:${player.name}</p>
                                         <p>Age:${player.age}</p>
                                       <p>Gender:${player.gender}</p>
                                       <p>sport:${player.sportType}</p>
                                   </div>

                                   <div class="banner-content-1">
                                        <p>name:${player.sport}</p>
                                   </div>
                                </div>
                           </div>
                           <div class="card-button-container">
                                   <button onclick=editor(${index})>
                                        edit
                                   </button>
                                   <button onclick=deleter(${index})>
                                        delete
                                   </button>
                           </div>
                       </div>
                          `)}
                      ).join("")
                      if(players.length==0)
                      document.getElementById("card-container").innerHTML="<h3 >No data Found</h3>"
                    }

renderPlayers(players);



                    // for rendering options in sports
                      const renderSelect=(prop)=>
                      {
                        const outdoor=["cricket","volleyball","football","wrestling"]
                        const indoor=["chess","carrom","batmitton","psp"]
                       const gameSelect=document.getElementById("sportSelect")
                       if(prop==="indoor")
                         gameSelect.innerHTML=indoor.map((val)=>`<option value="${val}">${val}</option>`).join("")
                        else
                        gameSelect.innerHTML=outdoor.map((val)=>`<option value="${val}">${val}</option>`).join("")
                        gameSelect.value="";
                     }


                     // reading form data
                      const readFormData=()=>
                      {
                         const formData={};
                         formData.name=document.getElementById("name").value
                         formData.age=document.getElementById("age").value
                         formData.gender=document.getElementById("gender").value
                         formData.sportType=document.getElementById("sport-type").value
                         formData.sport=document.getElementById("sportSelect").value
                         if(formState=="edit"&&document.getElementById("profile").value=="")
                         {
                          formData.profile=players[selectedIndex].profile;
                          formData.file=players[selectedIndex].file;
                         }
                         else
                         {
                          try{
                            
                          formData.profile=image;
                          formData.file=selectedFile[0].name;
                          }
                          catch{
                            formData.profile="";
                            formData.file="";                           
                          }
                         }
                          return formData
                       }

                      // validator

                       const isValid=(formData)=>
                       {
                        let valid=true;
                                 for (const val in formData)
                                {
                                    if(formData[val]||(formState=="edit"&&val=="profile"))continue;
                                    else
                                     {
                                       valid=false;
                                       return valid
                                     }
                                }
                          return valid
                       }
                       
                        //error messgae intiator
                        const errInitiator=(formData)=>{
                          if(!formValidity)
                          {
                          for(const value in formData)
                              { if(value=="file")continue
                                else document.getElementById(value+"-error").innerHTML=""
                              }
                          for(const value in formData)
                          {  
                             if(value==="file")continue
                             else if(formData[value]=="")document.getElementById(value+"-error").innerHTML="this field is required *"    
                          }
                          }
                        }

                       // form action
                      const formaction=()=>
                      {
                         const formData=readFormData();
                         if(isValid(formData))
                         {
                         if(formState==="create")
                         players.push(formData)
                         else if(formState==="edit")
                         players[selectedIndex]=formData
                         renderPlayers(players);
                         initializeform();
                         }
                         else
                         {
                          formValidity=false;
                          errInitiator(formData);
                         }
                      }  

                     
                      //deleter function
                      const deleter=(index)=>
                      {
                        if(window.confirm("Are you sure,You want to delet this?"))
                        {
                         players.splice(index,1);
                         renderPlayers(players);
                         initializeform();
                        }
                        else
                         {}
                      }
                      //error message handler

                        const errorHandler=(element)=>{
                          if(!formValidity)
                          {
                          if(element.value=="")
                          document.getElementById(element.name+"-error").innerHTML="this field is required *"
                          else
                          document.getElementById(element.name+"-error").innerHTML=""
                          }

                        }
                       

                      //form initializer
                      const initializeform=()=>
                      {
                       formState="create"
                       selectedIndex=null
                       selectedFile=null;
                       image=null;
                       formValidity=true;
                       document.getElementById("name").value=""
                       document.getElementById("age").value=""
                       document.getElementById("gender").value=""
                       document.getElementById("sport-type").value=""
                       document.getElementById("sportSelect").value=""
                       document.getElementById("profile").value=""
                       document.getElementById("fileName").innerHTML="No File Selected*"
                       document.getElementById("form-title").innerHTML="Add player Details"
                       document.getElementById("form-button-container").innerHTML=`
                       <button onclick="formaction()">Add player</button>`
                       const errors=document.getElementsByClassName("error")
                       for(let i=0;i<errors.length;i++)errors[i].innerHTML=""
                      }
initializeform();

                      //search tab
                      const searchrender=(searchparam)=>
                      {
                        const {name,value}=searchparam;
                        if(name=="name")document.getElementById("sport-type").value="";
                        else document.getElementById("nameSearch").value="";

                         if(value==="")
                        renderPlayers(players);
                        else
                         {searchedPlayers=players.filter((player=>player[name].match(`^`+value)))
                        renderPlayers(searchedPlayers);
                          }  
                      }
                      // edit function

                      const editor=(index)=>
                      {
                        formState="edit";
                        const selectedData=players[index];
                        selectedIndex=index;
                        renderSelect(selectedData.sportType)
                        document.getElementById("form-title").innerHTML="Edit player Details"
                        document.getElementById("form-button-container").innerHTML=`
                                                  <button onclick="formaction()">Update</button>
                                                  <button onclick="initializeform()">cancel</button>
                                                  `
                        document.getElementById("name").value=selectedData.name
                        document.getElementById("age").value=selectedData.age
                        document.getElementById("gender").value=selectedData.gender
                        document.getElementById("sport-type").value=selectedData.sportType
                        document.getElementById("sportSelect").value=selectedData.sport
                        document.getElementById("fileName").innerHTML=selectedData.file
                        const errors=document.getElementsByClassName("error")
                        for(let i=0;i<errors.length;i++)errors[i].innerHTML=""
                      }
                      
                      //changing image to data url
                      document.getElementById("profile").addEventListener("change",(event)=>{
                                const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg']
                                selectedFile=event.target.files
                                if(allowedFormats.includes(selectedFile[0].type))
                                {
                                let url=URL.createObjectURL(selectedFile[0])
                                image=url
                                document.getElementById("fileName").innerHTML=selectedFile[0].name
                                const errors=document.getElementsByClassName("error")
                                errors[5].innerHTML=""
                                }
                                else
                                {
                                  const errors=document.getElementsByClassName("error")
                                  errors[5].innerHTML="invalid format *"
                                }

                      })
                  // trigger file fetching
                                const triggerFile=()=>{
                                   document.getElementById("profile").click();
                                  }
                  // close player popup

                                const closePlayer=()=>{
                                    document.getElementById("wrapper2").style.display="none"
                                  }

                 //open player popup
                                  const openPlayers=()=>{
                                     document.getElementById("wrapper2").style.display="block"
                                    }
  
