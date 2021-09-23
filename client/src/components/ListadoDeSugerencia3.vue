<template>
  <div>
    <div class="row justify-around">
      <div class="col-12 q-pa-md" v-for="(item, index) in mapeando" :key="index">
        <q-card @click="(ruta === 'cliente') || (ruta === 'tienda') ? $router.push('/descripcionproducto/' + item._id) : showRequest(item)">
            <div v-if="!item.isQuoted" class="absolute-top-right q-pr-sm">Fecha de Solicitud {{item.fechaCreacion}}</div>
            <div v-if="item.isQuoted === true" class="bg-green row justify-between items-center">
              <q-chip color="transparent" text-color="white" class="text-weight-bold">
                Ya cotizada
              </q-chip>
              <div class="q-pr-sm text-white">Fecha de Solicitud {{item.fechaCreacion}} </div>
            </div>
            <div v-if="!item.isQuoted" class="column items-center justify-center">
              <div class="text-center text-white q-mt-lg text-h6" :class="`bg-${item.colorRadio}`" style="width:100%">{{item.name}} </div>
            </div>
            <div v-if="item.isQuoted === true" class="column items-center justify-center">
              <div class="text-center text-white q-mt-xs text-h6" :class="`bg-${item.colorRadio}`" style="width:100%">{{item.name}} </div>
            </div>

            <div class="row items-center q-py-sm">
              <div class="col-5 row justify-center">
                <q-avatar size="100px">
                  <img :src="baseu3 + 'perfil' + item.creador._id">
                </q-avatar>
              </div>

              <div class="col-7">
                <div class="row items-center no-wrap">
                  <q-icon size="sm" name="person" color="grey-7" />
                  <div class="text-grey-9 ellipsis">{{item.creador.full_name}} {{item.creador.last_name}}</div>
                </div>
                <div class="row q-mt-sm items-center no-wrap">
                  <q-icon size="sm" name="clean_hands" color="grey-7" />
                  <div class="text-grey-9 ellipsis">{{item.categorianame.name}}</div>
                </div>
              </div>
            </div>

            <div class="text-center text-h7 text-bold q-mt-md">Descripcion del servicio</div>
            <div class="row q-mb-lg" style="height:60px">
              <div class="col-12 q-px-md text-center text-grey-9 ellipsis-3-lines">{{item.descripcion}}</div>
            </div>

            <div class="row justify-around items-center q-pt-md">
              <div class="text-h7 text-grey-9">Urgencia requerimiento</div>
              <div class="row">
                <q-radio disable v-model="item.colorRadio" keep-color size="xs" val="red" color="red" />
                <q-radio disable v-model="item.colorRadio" keep-color size="xs" val="orange" color="orange" />
                <q-radio disable v-model="item.colorRadio" keep-color size="xs" val="blue" color="blue" />
              </div>
            </div>

            <div class="row item-center q-px-lg q-py-md">
                <q-icon size="sm" name="location_on" color="grey-7" />
                <div class="text-h7 text-grey-9">{{item.direccion}}</div>
            </div>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="show">
      <view-request :data="request" :profile="baseu3" @close="close" style="width: 100%; height: 80%"/>
    </q-dialog>
  </div>
</template>

<script>
import env from '../env'
import ViewRequest from 'components/ViewRequest.vue'
export default {
  components: {
    ViewRequest
  },
  props: ['data', 'ruta', 'direccion'],
  data () {
    return {
      show: false,
      baseu: '',
      baseu3: '',
      color: 'blue',
      request: {}
    }
  },
  mounted () {
    console.log('this.data >> ', this.data)
    if (this.ruta === 'cliente' || this.ruta === 'tienda') {
      this.baseu = env.apiUrl + '/productos_img'
    } else {
      this.baseu = env.apiUrl + '/necesidad_img'
      this.baseu3 = env.apiUrl + '/perfil_img/'
    }
  },
  methods: {
    showRequest (itemRequest) {
      this.baseu3 = env.apiUrl + '/perfil_img/'
      this.request = { ...itemRequest }
      console.log('this.request >> ', this.request)
      this.show = true
    },
    close (emit) {
      if (emit === true) {
        this.show = false
        this.$emit('close', true)
      }
    }
  },
  computed: {
    mapeando () {
      return this.data.map(v => {
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
