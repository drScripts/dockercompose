FROM postgres:16.2

RUN apt-get update && apt-get install -y build-essential curl postgresql-server-dev-16
RUN curl https://ftp.postgresql.org/pub/source/v16.2/postgresql-16.2.tar.bz2 -o /postgresql-16.2.tar.bz2
RUN cd / && tar xvf postgresql-16.2.tar.bz2
RUN cd /postgresql-16.2/contrib/cube && sed -i 's/#define CUBE_MAX_DIM (100)/#define CUBE_MAX_DIM (4096)/' cubedata.h && \
    USE_PGXS=true make && USE_PGXS=true make install

COPY ./init.sql /docker-entrypoint-initdb.d/