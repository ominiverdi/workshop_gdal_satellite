# orange pi

Create partition on ssd
sudo gdisk /dev/nvme0n1 
"d" for delete (1 to 8 and confirm)
"w" to save and exit
"n" for new partition (choose all defaults values)

2) install boot system on SSD
orangepi-config -> system -> install boot from SPI



Change timezone:
sudo ln -sf /usr/share/zoneinfo/Europe/Madrid /etc/localtime

# Singularitry


## TRY TO COPY executable
scp  root@10.0.0.102:/usr/local/bin/singularity /usr/local/bin/singularity
scp -r root@10.0.0.102:/usr/local/etc/singularity /usr/local/etc/singularity 
scp -r root@10.0.0.102:/usr/local/libexec /usr/local/libexec
scp -r root@10.0.0.102:/usr/local/var /usr/local/var
scp -r root@10.0.0.102:/usr/bin/mksquashfs /usr/bin/


mksquashfs

## COPY SIF
scp root@10.0.0.102:/media/singularity/restoration.sif .

## test sif

docker_image=/home/orangepi/restoration.sif
working_dir=home/orangepi/

singularity_cmd="singularity exec --disable-cache --bind $working_dir $docker_image"


singularity exec docker://lbecchi/restoration:latest
singularity shell docker://lbecchi/restoration:latest


# GDAL
apt install gdal-bin gdal-data 


# create geopackage from KML
ogr2ogr -f GPKG output_file.gpkg Sentinel2-Tiling_grid.kml Features