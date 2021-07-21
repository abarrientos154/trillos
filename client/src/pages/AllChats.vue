<template>
  <div>
    <!-- <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-bottom-right-radius: 20px; border-bottom-left-radius: 20px"/> -->
    <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-bottom-right-radius: 20px; border-bottom-left-radius: 20px">
      <div class="absolute-full column items-center column justify-end">
        <q-icon name="collections" class="text-grey" size="80px"></q-icon>
        <div class="text-bold text-center text-grey">Conversaciones iniciadas</div>
      </div>
    </q-img>
    <q-btn round dense flat icon="keyboard_backspace" color="primary" @click="$router.go(-1)"/>
    <div class="q-ma-md text-h6">Conversaciones iniciadas</div>
    <!-- <q-separator inset /> -->
    <!-- <div v-if="data.length > 0" class="q-pr-md q-pt-sm text-subtitle2 text-right text-grey-8"><u>Tienes {{ data.length }} Mensajes</u></div> -->

    <div v-if="data.length > 0 && data[0].data_supplier" class="col-12 q-pa-md">
        <q-card class="q-mb-md" v-for="(chat, index) in data" :key="index">
            <div class="row items-center absolute-bottom-right q-ma-sm">
              <q-btn :color="chat.viewed === false ? 'orange' : 'primary'" label="Ver cotización" no-caps style="width:122px" class="q-mr-sm" @click="showQuotation(chat)"/>
              <div>
                <div class="text-bold">Servicios del Taller</div>
                <q-avatar square size="30px" v-for="(item, index) in chat.services" :key="index">
                  <img :src="item.icons">
                </q-avatar>
              </div>
            </div>
            <div @click="$router.push('/chat/' + chat._id)">
              <div class="absolute-top-left q-pr-sm q-ml-sm">Ultima vez escrito {{chat.created_at_message}} </div>
              <div class="column items-center justify-center">
                <div class="q-mt-lg row justify-around items-center" :class="chat.viewed === false ? 'bg-orange' : 'bg-primary'" style="width:100%">
                  <div v-if="chat.viewed === false" class="row">
                    <div class="text-white">Tienes mensajes</div>
                    <div class="text-white text-bold q-ml-xs">sin leer</div>
                  </div>
                  <div v-else class="row">
                    <div class="text-white">Todos los mensajes</div>
                    <div class="text-white text-bold q-ml-xs">leidos</div>
                  </div>
                  <div class="text-white text-h6">{{rol === 2 ? chat.data_supplier.full_name : chat.data_client.full_name + ' ' + chat.data_client.last_name}}</div>
                </div>
              </div>
              <div class="row items-center q-pt-sm q-pb-xl">
                <div class="col-5 row justify-center">
                  <q-avatar size="100px">
                    <img :src="chat.data_supplier._id.length > 0 ? baseu + chat.data_supplier._id : 'noimgpro.png'">
                  </q-avatar>
                </div>
                <div class="col-7">
                  <div class="row q-mt-sm items-center no-wrap">
                    <q-icon size="sm" name="place" color="grey-7" />
                    <div class="text-grey-9 ellipsis">{{chat.country}} / {{chat.city}}</div>
                  </div>
                  <div class="row q-mt-sm items-center no-wrap">
                    <q-icon size="sm" name="store_mall_directory" color="grey-7" />
                    <div class="text-grey-9 ellipsis">{{chat.data_supplier.direccion}}</div>
                  </div>
              </div>
            </div>
            </div>
        </q-card>
    </div>
    <div v-if="data.length > 0 && data[0].data_client" class="col-12 q-pa-md">
        <q-card class="q-mb-md" v-for="(chat, index) in data" :key="index">
            <div class="row items-center absolute-bottom-right q-ma-sm">
              <q-btn :color="chat.viewed === false ? 'orange' : 'primary'" label="Ver Solicitud" no-caps style="width:122px" class="q-mr-sm" @click="showRequest(chat)"/>
            </div>
            <div @click="$router.push('/chat/' + chat._id)">
              <div class="absolute-top-left q-pr-sm q-ml-sm">Ultima vez escrito {{chat.created_at_message}} </div>
              <div class="column items-center justify-center">
                <div class="q-mt-lg row justify-around items-center" :class="chat.viewed === false ? 'bg-orange' : 'bg-primary'" style="width:100%">
                  <div v-if="chat.viewed === false" class="row">
                    <div class="text-white">Tienes mensajes</div>
                    <div class="text-white text-bold q-ml-xs">sin leer</div>
                  </div>
                  <div v-else class="row">
                    <div class="text-white">Todos los mensajes</div>
                    <div class="text-white text-bold q-ml-xs">leidos</div>
                  </div>
                  <div class="text-white text-h6">{{rol === 3 ? chat.data_client.full_name : chat.data_client.full_name + ' ' + chat.data_client.last_name}}</div>
                </div>
              </div>
              <div class="row items-center q-pt-sm q-pb-xl">
                <div class="col-5 row justify-center">
                  <q-avatar size="100px">
                    <img :src="chat.data_client._id.length > 0 ? baseu + chat.data_client._id : 'noimgpro.png'">
                  </q-avatar>
                </div>
                <div class="col-7">
                  <div class="row q-mt-sm items-center no-wrap">
                    <q-icon size="sm" name="place" color="grey-7" />
                    <div class="text-grey-9 ellipsis">{{chat.country}} / {{chat.city}}</div>
                  </div>
                  <div class="row q-mt-sm items-center no-wrap">
                    <q-icon size="sm" name="store_mall_directory" color="grey-7" />
                    <div class="text-grey-9 ellipsis">{{chat.data_request.direccion}}</div>
                  </div>
              </div>
              </div>
            </div>
        </q-card>
    </div>

    <q-dialog v-model="show" transition-show="slide-up" transition-hide="slide-down" >
      <q-carousel class="window-height" animated v-model="slide" infinite ref="carousel">
        <q-carousel-slide :name="1" class="q-pa-none" v-for="(item, index) in mapeando" :key="index">
          <div class="absolute-top-right q-pr-sm">Fecha de Solicitud {{item.creationDate}}</div>
          <div class="column items-center justify-center">
            <div class="text-center text-white q-mt-lg text-h5" :class="`bg-${item.colorRadio}`" style="width:100%">{{item.name}}</div>
          </div>
          <div class="text-center text-h6 text-bold q-mt-md">Descripcion del servicio</div>
          <div class="row q-mb-lg" style="height:60px">
            <div class="col-12 q-px-md text-center text-grey-9 ellipsis-3-lines">{{item.descripcion}}</div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div class="text-subtitle1 q-ml-md">Mensaje de Contacto</div>
            <q-input class="q-mx-md" readonly filled v-model="data2.message" type="textarea"/>
          </div>
          <div class="row justify-around items-center">
            <div class="text-bold">Fecha de termino</div>
            <q-input class="col-5" ss filled readonly dense v-model="data2.date" placeholder="dd/mm/aaaa">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row justify-around items-center">
            <div class="text-bold">Coste estimado</div>
            <q-input type="number" class="col-5" prefix="$" readonly filled dense v-model="data2.price">
            </q-input>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-dialog>
    <q-dialog v-model="show2" transition-show="slide-up" transition-hide="slide-down">
      <q-carousel class="window-height" animated v-model="slide2" infinite ref="carousel">
        <q-carousel-slide :name="1" class="q-pa-none">
          <div class="absolute-top-right q-pr-sm">Fecha de Solicitud {{request2.creationDate}}</div>
          <div class="column items-center justify-center">
            <div class="text-center text-white q-mt-lg text-h5" :class="`bg-${request2.colorRadio}`" style="width:100%">{{request2.name}}</div>
          </div>
          <div class="row items-center q-pt-lg">
            <div class="col-5 row justify-center">
              <q-avatar size="100px">
                <img :src="baseu + clientData._id">
              </q-avatar>
            </div>
            <div class="col-7">
              <div class="row items-center no-wrap">
                <q-icon size="sm" name="person" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{clientData.full_name}} {{clientData.last_name}}</div>
              </div>
              <div class="row q-mt-sm items-center no-wrap">
                <q-icon size="sm" name="phone" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{clientData.phone}}</div>
              </div>
              <div class="row q-mt-sm items-center no-wrap">
                <q-icon size="sm" name="place" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{request2.direccion}}</div>
              </div>
              <div class="row q-mt-sm items-center no-wrap">
                <q-icon size="sm" name="clean_hands" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{categoryName}}</div>
              </div>
            </div>
          </div>
          <div class="row justify-around items-center q-pt-md q-mb-md">
            <div class="text-subtitle1 text-grey-9">Urgencia requerimiento</div>
            <div class="row">
              <q-radio v-model="request2.colorRadio" keep-color size="xs" val="red" color="red" />
              <q-radio v-model="request2.colorRadio" keep-color size="xs" val="orange" color="orange" />
              <q-radio v-model="request2.colorRadio" keep-color size="xs" val="blue" color="blue" />
            </div>
          </div>
          <div class="q-ml-md text-h6 text-bold q-mt-md">Descripcion del servicio</div>
          <div class="row q-mb-lg" style="height:60px">
            <div class="col-12 q-px-md text-grey-9 ellipsis-3-lines">{{request2.descripcion}}</div>
          </div>
          <div class="q-ml-md text-h6 text-bold q-mt-md">Fotos del automovil</div>
          <q-scroll-area
            horizontal
            style="height: 110px;"
            class="q-ml-md"
          >
            <div class="row no-wrap" style="width: 100%">
              <q-card v-for="(img, index) in request2.images" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index" @click="imgSelec = baseu2 + img, showImg = true">
                <q-img :src="request2.images ? baseu2 + img : 'noimgpro.png'" spinner-color="white" style="height: 100px; width: 100px" />
              </q-card>
            </div>
          </q-scroll-area>
        </q-carousel-slide>
      </q-carousel>
    </q-dialog>
    <q-dialog v-model="showImg">
      <q-card>
        <img :src="imgSelec" spinner-color="white" style="height: 100%; width: 100%" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import env from '../env'
export default {
  data () {
    return {
      idQuotation: '',
      imgSelec: '',
      showImg: false,
      baseu: '',
      baseu2: '',
      ratingProduc: 3,
      ver: true,
      show: false,
      show2: false,
      data: [],
      data2: {},
      request: [],
      request2: {},
      slide: 1,
      slide2: 1,
      clientData: {},
      categoryName: ''
    }
  },
  mounted () {
    this.getRecords()
    this.baseu = env.apiUrl + '/perfil_img/perfil'
    this.baseu2 = env.apiUrl + '/necesidad_img/'
  },
  methods: {
    getRecords () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
          /* if (this.rol === 3 && (v.status === 0 || v.status === 2)) {
            this.ver = false
          } */
          if (this.ver) {
            this.$api.get('show_all_chats').then(res => {
              if (res) {
                this.data = res
                console.log('this.data :>> ', this.data)
              }
            })
          }
        }
      })
    },
    showQuotation (data) {
      this.request.push(data.data_request)
      this.data2 = {
        _id: data._id,
        message: data.message,
        date: data.date,
        price: data.price,
        status: data.status
      }
      this.show = true
    },
    showRequest (data) {
      console.log('data >> ', data)
      this.idQuotation = data._id
      this.request2 = data.data_request
      this.request2.colorRadio = this.request2.necesidad === 'Urgente (1 a 3 Horas)' ? 'red' : this.request2.necesidad === 'Medio (5 a 24 Horas)' ? 'orange' : 'blue'
      this.categoryName = this.request2.categorianame.name
      this.clientData = data.data_client
      this.show2 = true
    }
  },
  computed: {
    mapeando () {
      return this.request.map(v => {
        return {
          ...v,
          colorRadio: v.necesidad === 'Urgente (1 a 3 Horas)' ? 'red' : v.necesidad === 'Medio (5 a 24 Horas)' ? 'orange' : 'blue'
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border-left: 6px solid $primary;
  background-color: rgba(202, 202, 202, 0.474);
  border-radius: 12px;
}
</style>
