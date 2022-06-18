import react,{useState,useEffect} from "react";
import { StyleSheet,ImageBackground,Text, View,TextInput,Button,TouchableOpacity,Image,AppRegistry,Linking, ScrollView,FlatList,Alert} from 'react-native';
import 'react-native-gesture-handler';
import '../lib/firebase';
import firebase from "firebase";
export default function addop({navigation}) {
    const [databons,setdatabons]=useState()
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const [loadds,setloadds]=useState(true)
    const [datas,setdatas]=useState(null)
    const [datai,setdatai]=useState(null)
    useEffect(()=>{
        firebase.database().ref('/pressingMogador/entr/'+1+'/bon').on('value',snapshot=>{
            if(snapshot.exists()){
                setdatabons(snapshot.val())
            }
            else{
                setdatabons([1])
            }
        })
        firebase.database().ref('/pressingMogador/items').on('value',snapshot=>{
            setdatai(snapshot.val())
        })
        firebase.database().ref('/pressingMogador/services').on('value',snapshot=>{
            setdatas(snapshot.val())
            setloadds(false)
        })
    },[loadds])
    const [dataitems,setdataitems]=useState([])
    const [total,setTotal]=useState(0)
    const additem=()=>{
        setdataitems(dataitems=>[...dataitems,{
            prix:parseInt(prix)*parseInt(quantite),
            items:items,
            quantite:parseInt(quantite),
            service:services
        }])
        setTotal(total+parseInt(prix)*parseInt(quantite))
        setQua()
        setitem('')
        setservices('')
        setitem('')
        setprix()

    }
    const deleteelement=(ind)=>{
        var array=[]
        dataitems.map((i,index)=>{
            if(index==ind){

            }
            else{
                array.push(i)
            }
        })
        setdataitems(array)
    }
    const [quantite,setQua]=useState()
    const [prix,setprix]=useState()
    const [items,setitem]=useState('')
    const [services,setservices]=useState('')
    const [phone,setphone]=useState('')
    const [dsize,setdsize]=useState()
    const validatebon=()=>{
        
        firebase.database().ref('/pressingMogador/entr/'+1+'/bon/'+databons?.length).set({
            date:date,
            total:total,
            n:databons?.length,
            status:'تحت الخدمة'
        })
        dataitems.map((i,index)=>{
            firebase.database().ref('/pressingMogador/entr/'+1+'/bon/'+databons?.length+'/items/'+index).set({
                prix:i.prix,
                items:i.items,
                services:i.service,
                quantite:i.quantite,
                n:index
            })
        })
        setdataitems()
        setservices('')
        setitem('')
    }
    const addservicepopup=()=>{
        if(openaddservice){
            return(<View>

            </View>)
        }
        else{
            return(<View></View>)
        }
    }
    const [openaddservice,setoas]=useState(true)
    return(
        <View>
            <Text style={styles.texttitle}>اضافة بون</Text>
            
           
            <View style={{alignItems:'center',marginTop:2}}>
                <TouchableOpacity>
                    <Text style={styles.textserv}>الخدمات</Text>
                </TouchableOpacity>
            <View style={styles.spanel}>
            <ScrollView horizontal={true}>
                {
                    datas?.map((s)=>{
                        return(
                        <TouchableOpacity onPress={()=>{
                            setservices(services+'-'+s.service)
                        }}>
                        <View style={styles.service}>
                            <Text style={styles.textservice}>{s.service}</Text>
                        </View></TouchableOpacity>)
                    })
                }
            </ScrollView>
            </View></View>
            <View style={{alignItems:'center',marginTop:2}}>
                <Text style={styles.textserv}>السلعة</Text>
            <View style={styles.spanel}>
                <ScrollView horizontal={true}>
                {
                    datai?.map((s)=>{
                        return(
                        <TouchableOpacity onPress={()=>{
                            setitem(s.item)
                        }}>
                        <View style={styles.service}>
                            <Text style={styles.textservice}>{s.item}</Text>
                        </View></TouchableOpacity>)
                    })
                }</ScrollView>
            </View></View>
            <View style={{alignItems:'flex-end'}}>
                <View style={styles.sselected}>
                    <TouchableOpacity onLongPress={()=>{
                        setitem('')
                    }}>
                    <Text style={styles.stext}>{items}</Text>
                    </TouchableOpacity>
                    <Text style={styles.sptext}>السلعة:</Text>
                    
                </View>
                
                <View style={styles.sselected}>
                    <TouchableOpacity onLongPress={()=>{
                        setservices('')
                    }}>
                        <Text style={styles.stext}>{services}</Text>
                    </TouchableOpacity>
                    <Text style={styles.sptext}>الخدمات:</Text>
                    
                </View>
                
            </View>
            <View style={{alignItems:'center'}}>
                <View style={{flexDirection:'row'}}>
                    <TextInput style={styles.inputq} placeholderTextColor={'#e15f41'} keyboardType='numeric' placeholder="الكمية" value={quantite} onChangeText={(text)=>{
                        setQua(text)
                    }}/>
                    <TextInput style={styles.inputq} placeholderTextColor={'#e15f41'} keyboardType='numeric' placeholder="الثمن" value={prix} onChangeText={(text)=>{
                        setprix(text)
                    }} />
                    <TouchableOpacity onPress={()=>additem()}>
                        <View style={styles.addbtn}>
                            <Text style={{fontFamily:'Taj-bold',fontSize:16,color:'white'}}>اضافة</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{alignItems:'center',marginTop:10}}>
                <View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.showptext}>الثمن</Text>
                        <Text style={styles.showptext}>الخدمات</Text>
                        <Text style={styles.showptext}>السلعة</Text>
                        <Text style={styles.showptext}>الكمية</Text>
                    </View>
                    {/* {
                        dataitems.map((i)=>{
                            return(<Text>{i.prix}</Text>)
                        })
                    } */}
                    <View style={{height:'40%',width:'100%'}}>
                        <ScrollView style={{width:'100%',height:'100%'}}>
                            {
                                dataitems?.map((i,index)=>{
                                    return(<TouchableOpacity onLongPress={()=>{
                                        deleteelement(index)
                                    }}><View style={{alignItems:'center',flexDirection:'row'}}>
                                        <Text style={styles.showptext1}>{i.prix}</Text>
                                        <Text style={styles.showptext1}>{i.service}</Text>
                                        <Text style={styles.showptext1}>{i.items}</Text>
                                        <Text style={styles.showptext1}>{i.quantite}</Text>
                                    </View></TouchableOpacity>)
                                })
                            }
                        </ScrollView>
                    </View>
                </View>
                
            </View>
            <TouchableOpacity onPress={()=>{
                validatebon()
            }}>
                <View style={styles.validate}>
                    <Text style={{fontFamily:'Taj-bold',fontSize:16,color:'white'}}>المصادقة</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles=StyleSheet.create({
    texttitle:{
        fontFamily:'Taj-bold',
        marginTop:50,
        fontSize:20,
        textAlign:'center'
    },
    inputpn:{
        width:240,
        textAlign:'center',
        fontFamily:'Taj-regular',
        fontSize:16,
        borderRadius:10,
        borderColor:'#0a3d62',
        borderWidth:3,
        padding:8,
        marginTop:10
    },
    spanel:{
        alignItems:'center',
        flexDirection:'row',
        // overflow:'scroll'
        
    },
    service:{
        marginLeft:10,
        borderRadius:20,
        borderWidth:1,
        borderColor:'black',
        padding:10,
        width:80,
        alignItems:"center"
    },
    textservice:{
        fontFamily:'Taj-bold'
    },
    textserv:{
        fontFamily:'Taj-bold',
        padding:10,
        fontSize:16
    },sselected:{
        flexDirection:'row',
        padding:10
    },sptext:{
        fontFamily:'Taj-bold'
    },
    stext:{
        fontFamily:'Taj-regular'
    },
    addbtn:{
        borderRadius:10,
        backgroundColor:'#e15f41',
        padding:10,
    },
    inputq:{
        marginRight:10,
        borderRadius:10,
        borderWidth:2,
        borderColor:'#e15f41',
        width:100,
        textAlign:'center',
        fontSize:16,
        fontFamily:'Taj-bold',
        color:'#e15f41'
    },
    showptext:{
        width:'25%',
        textAlign:'center',
        fontFamily:'Taj-bold'
    },
    validate:{
        alignItems:'center',
        borderRadius:20,
        backgroundColor:'#38ada9',
        padding:10,
        marginTop:20,
        marginLeft:10,
        marginRight:10
    },
    showptext1:{
        width:'25%',
        textAlign:'center',
        fontFamily:'Taj-regular',
        color:'black'
    }
})