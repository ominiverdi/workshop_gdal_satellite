# workshop_gdal_satellite
Taller de GDAL con datos satelitales


# reference:
https://download.osgeo.org/gdal/workshop/foss4ge2015/workshop_gdal.pdf


# test data

## test data associated rights
• paris.tif : extract of OpenStreetMap. (C) OpenStreetMap contributors :
http://www.openstreetmap.org/copyright


# Environment
OSGeo live!?!?!

OSGeo Live 8.5 or GDAL 1.11.1 or later, with Python bindings and QGIS (for
display). The workshop can be run directly from the OSGeo Live DVD/USB stick or
in a VM (at least 3 GB of RAM dedicated for it, or 1 GB of RAM + 2 GB of disk for
storing data) , but it is recommended to install the OSGeo Live in a VM hard disk for
better performance.


# Metadata

## gdalinfo
gdalinfo is the utility you will use all the time to discover metadata about a raster. This will also
enable us to get a practical knowledge of most of the concepts of the GDAL data model :
http://www.gdal.org/gdal_datamodel.html

Documentation of the gdalinfo utility : http://gdal.org/1.11/gdalinfo.html


### general info

$ gdalinfo world.tif


Driver: GTiff/GeoTIFF
Files: world.tif
Size is 2048, 1024
Coordinate System is:
GEOGCS["WGS 84",
DATUM["WGS_1984",
SPHEROID["WGS 84",6378137,298.257223563,
AUTHORITY["EPSG","7030"]],
AUTHORITY["EPSG","6326"]],
PRIMEM["Greenwich",0],
UNIT["degree",0.0174532925199433],
AUTHORITY["EPSG","4326"]]
Origin = (-180.000000000000000,90.000000000000000)
Pixel Size = (0.175781250000000,-0.175781250000000)
Metadata:
AREA_OR_POINT=Area
Image Structure Metadata:
INTERLEAVE=BAND
Corner Coordinates:
Upper Left (-180.0000000, 90.0000000) (180d 0' 0.00"W, 90d 0' 0.00"N)
Lower Left (-180.0000000, -90.0000000) (180d 0' 0.00"W, 90d 0' 0.00"S)
Upper Right ( 180.0000000, 90.0000000) (180d 0' 0.00"E, 90d 0' 0.00"N)
Lower Right ( 180.0000000, -90.0000000) (180d 0' 0.00"E, 90d 0' 0.00"S)
Center ( 0.0000000, 0.0000000) ( 0d 0' 0.01"E, 0d 0' 0.01"N)
Band 1 Block=256x256 Type=Byte, ColorInterp=Red
Overviews: 1024x512, 512x256, 256x128, 128x64, 64x32, 32x16, 16x8
Band 2 Block=256x256 Type=Byte, ColorInterp=Green
Overviews: 1024x512, 512x256, 256x128, 128x64, 64x32, 32x16, 16x8
Band 3 Block=256x256 Type=Byte, ColorInterp=Blue
Overviews: 1024x512, 512x256, 256x128, 128x64, 64x32, 32x16, 16x8


Analysis of output :
• Driver : Formats in GDAL are managed by different « drivers ». Basically 1 driver is
dedicated to 1 format. Lists of drivers available at http://gdal.org/1.11/formats_list.html
• Files : list of files. Main file + potential additional files (world files, etc...)
• Size is 2048, 1024. First figure is Width in pixels. Second one is Height in pixels.
• Coordinate System: Also called projection, SRS (Spatial Reference System), CRS
(Coordinate Refrence System), … The string presented here is in WKT (Well Known Text)
format. The one used here is one of the most simple one. Coordinates are expressed in
longitude & latitude on the WGS84 (World Geodetic Survey 1984) datum (due to longitude
& latitude being directly used, this is called a geographic coordinate system « GEOGCS »)
• Origin : This is the projected coordinate of the upper-left corner of the image (the upper-left
corner of the upper-left pixel). Here -180 is the longitude and 90 the latitude.
• Pixel Size : The dimension of a pixel in the units of the coordinate system. The first value is
the width of the pixel, the second one its height. Here 0.17578125 is in degrees (see
UNIT["degree"...] in the Coordinate System string). At the equator, this means roughly 0.
17578125 * 40000 / 360 = 19.5 km (the circonference of the Earth is rougly 40 000 km, and
covers 360 degrees). You can notice the negative value for the pixel height. This is to
indicate that the geospatial coordinates are decreasing when you go from the top of the
image to the bottom of the image. This is the case for most geospatial rasters, so they appear
correctly in all viewers.
• Metadata : a list of KEY=VALUE pairs, depending on the format and data. Here
AREA_OR_POINT=AREA is a GDAL specific metadata to indicate that the on-file
convention for the geo-registration is to take the upper-left corner of pixels (to be opposed to
AREA_OR_POINT=POINT where the center of pixel is considered). You generally don't
have to care about this one. This is mostly informational. For more details (rather involved),
see https://trac.osgeo.org/gdal/wiki/rfc33_gtiff_pixelispoint
• Image structure metadata : gives details about :
• the arrangement of pixels. INTERLEAVE=BAND here means that in the file you
have first all the pixels for the Red band, then for the Green band and finally for the
Blue band. The other formulation is INTERLEAVE=PIXEL which means that for
each pixel you have the red value followed by the green and blue values, and then for
the next pixel another R,G,B tuple, etc... This can be interesting to know for the
efficiency of algorithms when processing big images. You might want to proceed
closely with the natural organization of the data for best performance.
• Potentially, compression used (JPEG, LZW, DEFLATE, etc...). Here's none.
• Potentially, number of bits used when the data width is smaller than the data type
holding it. For example 12-bit wide data (values between 0 and 4095) will be stored
in a unsigned 16-bit integer, and NBITS=12 will be advertized
• Corner coordinates : the geospatial coordinates of the 4 corner of the images (including any
padding), as well as the center pixel, expressed in the coordinate system for the first tuple.
The second tuple gives their equivalents as longitude, latitude. Here since it is a geographic
coordinate system, both values are identical
• Band description :
◦ Block=256x256 : A block corresponds to a rectangular subpart of the raster. The first
value is the width of the block and the second value its height. Typical block shapes are
lines or group of lines (in which case the block width is the raster width) or tiles
(typically squares), such as here. Knowing the block size is important when efficient
reading of a raster is needed. In case of tiles, this means reading rasters from the left-
most tile of the raster to the right-most of the upper lines and progressing that way
downward to the bottom of the image.
◦ Type=Byte : This is the data type of a pixel. Byte (unsigned byte) can store integer
values between 0 and 255 and is the most common one. Other data types are possibles
such as Int16 ([-32768,32767], UInt16([0,65535],Int32,UInt32,Float32 (single-precision
floating point),Float64 (double-precision floating point). Int16 or Float32/Float64 can be
encountered for digital elevation models (DEMs). UInt16 for raw satellite imagery.
There are also data types that store complex numbers (with real and imaginary part), but
this is rather esoteric and only used in a few drivers, mainly in the field of SAR
(Synthetic Aperture Radar).
◦ ColorInterp=Red : The color interpretation of the band. Common values are Red, Green,
Blue, Alpha (for opacity channel. 0=fully transparent, 255=fully opaque) or Unknown.
Other values are possible for other color spaces such as Cyan, Magenta, Yellow, blacK,
but not often encountered. Note that there's no color interpretation fo Near InfraRed for
example. This is something that must be deduced from other metada or knowledge of the
product characteristics
◦ Overviews : this gives the list of overviews available for the band (this may be empty).
Overviews are also called pyramids in GIS. They are versions of reduced size of the full
resolution raster to enable fast zoom-out operations. The first overview level is typically
half the size (in both dimensions) as the full resolution one, the second overview level
half the size of the first one, and so on... So the extra « cost » in term of storage size to
add overviews is : 1 / (2*2) + 1 / (4*4) + 1 / (8*8) + etc.... which equals to 1 / 3. So
overviews are generally and worth building, especially for use that involves interactive
display of the raster. Here, looking at the file list and seing that only one file is
mentionned, you can deduce that the overviews are stored within that file. Only a few
formats, like TIFF/GeoTIFF, allow that. Otherwise files may be stored in external .ovr
files


### Statistics, histogram, checksum
Try:
$ gdalinfo -stats -nogcp -nomd m2frac10bit.l1b
Output:
Driver: L1B/NOAA Polar Orbiter Level 1b Data Set
Files: m2frac10bit.l1b
Size is 2048, 222
Coordinate System is `'
Subdatasets:
SUBDATASET_1_NAME=L1B_ANGLES:"m2frac10bit.l1b"
SUBDATASET_1_DESC=Solar zenith angles, satellite zenith angles and relative
azimuth angles
SUBDATASET_2_NAME=L1B_CLOUDS:"m2frac10bit.l1b"
SUBDATASET_2_DESC=Clouds from AVHRR (CLAVR)
Corner Coordinates:
Upper Left ( 0.0, 0.0)
Lower Left ( 0.0, 222.0)
Upper Right ( 2048.0, 0.0)
Lower Right ( 2048.0, 222.0)
Center ( 1024.0, 111.0)
Band 1 Block=2048x1 Type=UInt16, ColorInterp=Undefined
Description = AVHRR Channel 1: 0.58 micrometers -- 0.68 micrometers
Min=39.000 Max=165.000
Minimum=39.000, Maximum=165.000, Mean=43.898, StdDev=7.642
Band 2 Block=2048x1 Type=UInt16, ColorInterp=Undefined
Description = AVHRR Channel 2: 0.725 micrometers -- 1.10 micrometers
Min=39.000 Max=226.000
Minimum=39.000, Maximum=226.000, Mean=43.882, StdDev=8.992
Band 3 Block=2048x1 Type=UInt16, ColorInterp=Undefined
Description = AVHRR Channel 3A: 1.58 micrometers -- 1.64 micrometers
Min=533.000 Max=983.000
Minimum=533.000, Maximum=983.000, Mean=906.890, StdDev=27.716
Band 4 Block=2048x1 Type=UInt16, ColorInterp=Undefined
Description = AVHRR Channel 4: 10.3 micrometers -- 11.3 micrometers
Min=454.000 Max=821.000
Minimum=454.000, Maximum=821.000, Mean=563.780, StdDev=61.628
Band 5 Block=2048x1 Type=UInt16, ColorInterp=Undefined
Description = AVHRR Channel 5: 11.5 micrometers -- 12.5 micrometers
Min=446.000 Max=803.000
Minimum=446.000, Maximum=803.000, Mean=550.119, StdDev=61.217