FROM valeriansaliou/sonic:v1.3.0

WORKDIR /usr/src/sonic

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt-get install -y nodejs

RUN mkdir -p  /var/lib/data/level
RUN mkdir -p  /var/lib/data/sonic/store/kv/
RUN mkdir -p  /var/lib/data/sonic/store/fst/

COPY . .
RUN npm install
CMD [ "./start.sh" ]

EXPOSE 3000
