import Head from 'next/head'
import React, { useState, useEffect, Component } from "react";
import styles from '../styles/Home.module.scss'
import SwitchSelector from "react-switch-selector";

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { IconButton,Checkbox,Button } from '@material-ui/core';
import { EditorLinearScale } from 'material-ui/svg-icons';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ShuffleIcon from '@material-ui/icons/Shuffle';

import Lightbox from 'react-image-lightbox';
import { SettingsInputHdmiOutlined, TrendingUpRounded } from '@material-ui/icons';

import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();


const useStyles = makeStyles({
  root: {
    width: "300px",
  },
});

function paginate(array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice(0, page_number * page_size);
}

export default function Home({allProducts}) {
  const [page, setPage] = React.useState(1);
  const [open, isOpen] = React.useState(false);
  const [photoIndex, setPhotoIndex] =  React.useState(0);

  const [images, setImages] = React.useState([]);

  const openLB = async (photo) => {
    let a = await setImages(photo)
    a = isOpen(true);
    
  };

  //Slider
  const classes = useStyles();
  const [value, setValue] = React.useState([0, 190]);

  const handleChangeSlider = (event, newValue) => {
    setValue(newValue);
    setMinPrice(newValue[0])
    setMaxPrice(newValue[1])
  };

// Filters
// 
const optionsFilters = [
  { value: 'loom', label: 'Loom' },
  { value: 'dedicated', label: 'Dedicated' },
  { value: 'MudJeans', label: 'MudJeans' },
  { value: 'adresseparis', label: 'adresseparis' },
  { value: 'Pull', label: 'Pull' },
  { value: 'Jacket', label: 'Jacket' },
  { value: 'Socks', label: 'Socks' },
  { value: 'Chaussettes', label: 'Chaussettes' },
  { value: 'Manteau', label: 'Manteau' },
  { value: 'Parka', label: 'Parka' },
  { value: 'Veste', label: 'Veste' },
  { value: 'Blouson', label: 'Blouson' },
  { value: 'Pantalon', label: 'Pantalon' },
  { value: 'Jean', label: 'Jean' },
  { value: 'Sweat', label: 'Sweat' },
  { value: 'Chemise', label: 'Chemise' },
  { value: 'Polo', label: 'Polo' },
  { value: 'Hoodie', label: 'Hoodie' },
  { value: 'Jogger', label: 'Jogger' },
  { value: 'Windbreaker', label: 'Windbreaker' },
  { value: 'Gilet', label: 'Gilet' },
]
  //Data

  const [allFavs, setAllFavs] = useState([]);
  const [allFavsIds, setAllFavsIds] = useState([]);
  const [allProductsDisplay, setProductsDisplay] = useState([]);

  const [selFilters, setselfilters] = useState([]);
  const [minPrice,setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [inc, setInc] = useState(false);
  const [dec, setDec] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [union, setUnion] = useState(true);

  const _handleSelect = (selectChoice) => {
    setselfilters(selectChoice);
    

  };

  useEffect(()=>{

    let filtersSelect = []
    selFilters.forEach(element => {
      filtersSelect.push(element.value)
    });
    let filter = []

     if(union){ 
       filter = allProducts.filter(obj=> (filtersSelect.some(v => obj.name.includes(v)) || filtersSelect.some(v => obj.brand.includes(v)) ) )
      }
     else{ filter = allProducts.filter(obj=> filtersSelect.some(v => obj.name.includes(v)) && filtersSelect.some(v => obj.brand.includes(v))) }

    filter = filter.filter(x=> x.price <maxPrice && x.price >minPrice)
    if(inc){
      filter.sort((a,b)=>(a.price>b.price)?1:-1)
    }
    
    else if(dec){
      filter.sort((a,b)=>(a.price<b.price)?1:-1)
    }
    
    else if(shuffle){
      filter.sort( () => Math.random() - 0.5);
      setShuffle(false)
    }

    if(selFilters.length==0){
      let products = allProducts.filter(x=> x.price <maxPrice && x.price >minPrice)
      if(inc){
        products.sort((a,b)=>(a.price>b.price)?1:-1)
      }
      
      else if(dec){
        products.sort((a,b)=>(a.price<b.price)?1:-1)
      }
      setProductsDisplay(paginate(products, 24, page))
    }else{
      filter = paginate(filter, 24, page)
      setProductsDisplay(filter)
    }

    

  },[selFilters,minPrice,maxPrice,inc,dec,shuffle,union,page])


  useEffect(()=>{
    setPage(1)
  },[selFilters,minPrice,maxPrice,inc,dec])

  useEffect(()=>{

    let prod = allProducts.sort(()=>Math.random()-0.5)
    setProductsDisplay(paginate(prod,24,page))
    setInc(false)
    setDec(false)

  },[shuffle])

  //Toggle switch
  const options = [
    {
        label: <span>All &#x1F455;</span>,
        value: "all",
        selectedBackgroundColor: "#eeeeee",
    },
    {
      label: <span>Favorites &#x2764;&#xFE0F;</span>,
        value: "favorites",
        selectedBackgroundColor: "#eeeeee"
    }
 ];

 const onChangeSwitch = (newValue) => {
  if(newValue != "all" && newValue != "favorites"){
    let filter = allProducts.filter(obj=>obj.brand == newValue)
    setProductsDisplay(filter);
  }
  else if (newValue == "favorites"){
    setProductsDisplay(allFavs);
  }
  else if(newValue == "all"){
    setProductsDisplay(paginate(allProducts,24,page));
  }
};




 function handleCheckFav(e,_id) {
  let temp = [...allFavs]
  let tempIds = [...allFavsIds]

  if(allFavsIds.includes(_id)){
    temp = temp.filter(n => n._id != _id)
    tempIds = tempIds.filter(n => n != _id)
  }
  else{
    let filter = allProducts.filter(obj=>obj._id == _id)
    temp.push(filter[0]);
    tempIds.push(_id)
  }
  
  setAllFavs(temp);
  setAllFavsIds(tempIds)
  console.log(allFavs)
};




  return (
    <div className={styles.container} >
      <Head>
        <title>Clear Fashion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <div style={{backgroundColor:'black',width:'100vw',padding:'1rem 0', marginBottom:'30px'}}>
        <h2 className={styles.title}>
          <code href="https://nextjs.org" style={{color:'white'}}> &#x1f331; Clear Fashion &#x1f331;</code>
        </h2>

        <p className={styles.description}>
          <code className={styles.code}>Hub for eco-friendly brands</code>
        </p>
      </div>
        {/* <div className = {styles.fixedbutton}></div> */}


        <div className = {styles.switch} style={{width:"70%",height: "2rem"}}>
        <SwitchSelector
            onChange={onChangeSwitch}
            options={options}
            initialSelectedIndex={0}
            backgroundColor={"#c7c7c7"}
            fontColor={"#f5f6fa"}
            
        />
        </div>
        <div className={styles.row}>
        <div className = {styles.switch} style={{height: "2rem", padding:"2rem",zIndex:"10"}}>
        <CreatableSelect
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={''}
          isMulti
          value = {selFilters}
          onChange={(e)=>_handleSelect(e)}
          options={optionsFilters}
          on
        />
        </div>
        <ToggleButtonGroup size="medium">
        {
          !union?
          <ToggleButton value="left" onClick={()=>{setUnion(true)}}>
              ⋂
          </ToggleButton>
          :
          <ToggleButton value="left" onClick={()=>{setUnion(false)}}>
              ⋃
          </ToggleButton>
        }
         
        </ToggleButtonGroup>
        </div>
      <div className = "wrapper">
      
      <div className = "mydiv-22">

      <div className="wrapper" style={{ float: 'right', flexWrap:'nowrap',marginTop:"2rem",alignItems:"center"}}>
      <div style={{marginBottom:"10px",borderRadius:"8px", marginRight:"2rem", backgroundColor:'#eeeeee', padding:"5px"}}>{value[0]}€ to {value[1]}€</div>
      <div className={classes.root} > 
      <div className = {styles.slider}>
      <Slider
        value={value}
        onChange={handleChangeSlider}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        max={500}
      />
      </div>
      </div>
      </div>
      </div>


    </div>

        <ToggleButtonGroup size="medium">
          <ToggleButton value="left" onClick={()=>{setDec(true);setInc(false);setShuffle(false)}}>
            <ArrowDownwardIcon />
          </ToggleButton>
          <ToggleButton value="center" onClick={()=>{setDec(false);setInc(true);setShuffle(false)}}>
            <ArrowUpwardIcon />
          </ToggleButton>
          <ToggleButton value="center" onClick={()=>{setDec(false);setInc(false);setShuffle(true); }}>
            <ShuffleIcon />
          </ToggleButton>
        </ToggleButtonGroup>

        <div className={styles.grid}>

        {
          allProductsDisplay.map(({name,_id,price,link,photo,brand})=>(
            <div className={styles.card} key = {_id}>

            <div onClick = {()=>openLB(photo)}>
            <img src = {photo[0]}></img>
           </div>

            <h3 style = {{cursor:'pointer'}} onClick={()=> window.open(link,"_blank")}>{name}</h3>
            <div className = {styles.priceUp}> {price} €
            </div>
            <div className = {styles.brandUp}> {brand}</div>
            <div className = {styles.photosUp}>
            <Button onClick = {()=>openLB(photo)}
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<PhotoCameraIcon />}
            >
              {photo.length}
            </Button>
            </div>

            <Checkbox style = {{position:"absolute", right:"0",top:"0" }}
                icon={<FavoriteBorderIcon fontSize="large"/>} 
                checkedIcon={<FavoriteIcon fontSize="large"/>} 
                name="checkedH" 
                checked = {allFavsIds.includes(_id)}
                onChange={(e) => handleCheckFav(e,_id)}
                />
          </div>
          ))

        }
  
        </div>
        {
          allProductsDisplay.length==0?
          
          <div>Pas de produits</div>
          :
          <Button onClick={()=>setPage(page+1)}
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
            >
              Load more
            </Button>
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/jremygrd"
          target="_blank"
          rel="noopener noreferrer"
        >
          J.Gourdeau - 2021
        </a>
      </footer>

        {open && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => isOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex(
                (photoIndex + images.length - 1) % images.length,
                )
              
            }
            onMoveNextRequest={() =>
              setPhotoIndex(
                (photoIndex + 1) % images.length
                )
            }
          />
        )}

      
    </div>
  )
}



export async function getStaticProps() {
  const products = await fetch ("https://server-jremygrd.vercel.app/allproducts");
  const allProducts = await products.json();

  return {
    props: {
      allProducts
    }
  }
}