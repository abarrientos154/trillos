<template>
  <div>
    <!-- <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-bottom-right-radius: 20px; border-bottom-left-radius: 20px"/> -->
    <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-bottom-right-radius: 20px; border-bottom-left-radius: 20px">
      <div class="absolute-full column items-center column justify-end">
        <q-icon name="collections" class="text-grey" size="80px"></q-icon>
        <div class="text-bold text-center text-grey">Conversaciones iniciadas</div>
      </div>
    </q-img>
    <div class="q-ma-md text-h6">Conversaciones iniciadas</div>
    <!-- <q-separator inset /> -->
    <!-- <div v-if="data.length > 0" class="q-pr-md q-pt-sm text-subtitle2 text-right text-grey-8"><u>Tienes {{ data.length }} Mensajes</u></div> -->

    <div v-if="data.length > 0" class="col-12 q-pa-md">
        <q-card @click="$router.push('/chat/' + chat._id)" v-for="(chat, index) in data" :key="index">
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
                  <img :src="chat.data_request.images.length > 0 ? baseu + chat.data_request.images[0] : 'noimgpro.png'">
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
            <div class="row items-center absolute-bottom-right q-ma-sm">
              <q-btn :color="chat.viewed === false ? 'orange' : 'primary'" label="Ver cotización" no-caps style="width:122px" class="q-mr-sm"/>
              <div>
                <div class="text-bold">Servicios del Taller</div>
                <q-avatar square size="30px" v-for="(item, index) in chat.services" :key="index">
                  <img :src="item.icons">
                </q-avatar>
              </div>
            </div>
            </div>
        </q-card>
    </div>
    <!-- <div v-if="data.length > 0" class="q-pa-md q-gutter-md">
        <q-card class="bordes row" @click="$router.push('/chat/' + chat._id)" v-for="(chat, index) in data" :key="index">
            <div class="col-3">
              <q-avatar class="q-pl-sm" size="60px">
                <q-img :src="chat.data_request.images.length > 0 ? baseu + chat.data_request.images[0] : 'noimgpro.png'" />
              </q-avatar>
              <div class="text-center text-grey text-bold text-caption q-pb-xs">{{chat.status !== 'Presupuesto' ? chat.status : 'Pendiente'}}</div>
            </div>
            <div class="col-9">
              <div class="text-black text-bold text-subtitle1 q-pt-sm">{{rol === 2 ? chat.data_supplier.full_name : chat.data_client.full_name + ' ' + chat.data_client.last_name}}</div>
              <div class="row">
              <div class="text-caption">{{chat.data_request.name}}</div>
              </div>
              <div class="text-caption q-px-sm">{{chat.last_message}}</div>
              <div class="absolute-bottom text-amber-8 text-subtitle1 text-right q-pr-sm">{{chat.created_at_message}}</div>
            </div>
        </q-card>
    </div>

    <q-card v-else class="shadow-2 q-ma-md q-pa-md">
      <div class="text-center text-subtitle1">Actualmente sin chats...</div>
    </q-card> -->
  </div>
</template>

<script>
import env from '../env'
export default {
  data () {
    return {
      baseu: '',
      ratingProduc: 3,
      ver: true,
      data: [],
      data2: [],
      id: ''
    }
  },
  mounted () {
    this.getRecords()
    this.baseu = env.apiUrl + '/necesidad_img/'
  },
  methods: {
    getRecords () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
          if (this.rol === 3 && (v.status === 0 || v.status === 2)) {
            this.ver = false
          }
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
