'use client'
import React, { useState } from "react";
import "./index.css";
import Link from "next/link";
import { Grid, Card, Stack, Button, Typography, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Swiper, SwiperSlide } from "swiper/react";


import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (index:any) => {
    setActiveIndex(index);
  };

  return (
    <Grid container spacing={8} sx={{marginTop:0}}>
      <Grid item xs={12} md={12}>
    
        <div style={{ width: "99%", border: "4px solid #fff" }}>
          <Swiper
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
          >
            <Box>
              <SwiperSlide>
                <Image
                  src="https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1704454964_429.jpg"
                  layout="responsive"
                  width={800}
                  height={0}
                  alt="this is image"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1704433105_323.jpg"
                  layout="responsive"
                  width={800}
                  height={0}
                  alt="this is image"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1704454964_429.jpg"
                  layout="responsive"
                  width={800}
                  height={0}
                  alt="this is image"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1704353142_378.jpg"
                  layout="responsive"
                  width={800}
                  height={0}
                  alt="this is image"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1704360713_391.jpg"
                  layout="responsive"
                  width={800}
                  height={0}
                  alt="this is image"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1704172465_398.jpg"
                  layout="responsive"
                  width={800}
                  height={0}
                  alt="this is image"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="https://assets.sangeethamobiles.com/placeholder_banner/placeholderBanner_1704172465_398.jpg"
                  layout="responsive"
                  width={800}
                  height={0}
                  alt="this is image"
                />
              </SwiperSlide>
            </Box>
          </Swiper>
        </div>

       
      </Grid>
    </Grid>
  );
}

export default Carousel;