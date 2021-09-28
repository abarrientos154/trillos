<template>
  <div class="" style="height:100%">
      <q-img :src="form.images ? baseu + perfile : 'noimgpro.png'" spinner-color="white" style="height: 250px; width: 100%;border-bottom-right-radius:25px;border-bottom-left-radius:25px">
      </q-img>

      <q-card  bordered style="width: 100%">
          <q-card-section horizontal>
              <q-card-section>
                <div class="column items-center justify-center">
                  <q-img
                    style="height: 90px;width: 100px"
                    class="rounded-borders"
                    :src="form.images ? baseu + perfile : 'noimgpro.png'" spinner-color="white"
                  />
                  </div>
                </q-card-section>

              <q-card-section class="q-pt-md">
              <div class="column justify-center">
                <div class="text-caption ">{{infoClient.full_name}}</div>
                <div class="text-caption ">{{'Fecha de solicitud:'}}{{form.newFecha}}</div>
                <div class="text-caption ">{{'Hora de solicitud:'}}{{form.hora}}</div>
                <div class="column justify-center">
                  <div class="text-caption">nivel de requerimiento</div>
                  <div class="row">
                    <q-radio v-model="form.colorRadio" disable keep-color size="xs" val="red" color="red" />
                    <q-radio v-model="form.colorRadio" disable keep-color size="xs" val="blue" color="blue" />
                  </div>
                </div>
              </div>
              </q-card-section>
            </q-card-section>

          <q-scroll-area
          horizontal
          style="height: 110px;"
        >
          <div class="row no-wrap" style="width: 100%">
            <q-card @click="perfile = img" v-for="(img, index) in form.images" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index">
              <q-img :src="form.images ? baseu + img : 'noimgpro.png'" spinner-color="white" style="height: 100px; width: 100px" />
            </q-card>
          </div>
        </q-scroll-area>
      </q-card>

      <q-card class="q-pa-md shadow-up-4">
      <div class="column items-center justify-center">
        <div class="text-h5 q-ml-md q-pt-xs">{{form.name}}</div>
        <div class="q-pa-md">{{form.descripcion}}</div>
        </div>
        <div class="q-pa-md">{{form.direccion}}</div>
        <div v-if="rol === 3" class="row justify-center q-pa-sm q-mt-md">
          <q-btn rounded  color="primary" label="Iniciar cotización" style="width:200px" @click="iraChat(form._id)"/>
        </div>
      </q-card>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      id: this.$route.params.id,
      rol: 0,
      perfile: '',
      ruta: 'necesidad',
      form: {},
      infoClient: {},
      categoria: {},
      baseu: ''
    }
  },
  mounted () {
    this.cargarSolicitud()
    this.baseu = env.apiUrl + '/necesidad_img/'
  },
  methods: {
    cargarSolicitud () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.$api.get(`${this.ruta}/${this.id}`).then(res2 => {
            if (res2) {
              this.form = res2
              this.perfile = this.form.images[0]
              this.cargarCategoria()
              if (this.form) {
                this.$api.get('user_by_id/' + this.form.ownerId).then(v => {
                  this.infoClient = v
                })
              }
            }
          })
        }
      })
    },
    iraChat (id) {
      this.$api.get('user_info').then(res => {
        if (res) {
          var info = {}
          info.proveedor_id = res._id
          info.categoria_id = this.form.categoria_id
          info.cliente_id = this.infoClient._id
          this.$api.post('crear_chat/' + id, info).then(v => {
            if (v) {
              this.$router.push('/chat/' + v._id)
            }
          })
        }
      })
    },
    cargarCategoria () {
      this.$api.get('categoria').then(v => {
        if (v) {
          this.categoria = v.find(x => x._id === this.form.categoria_id)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border-top: 6px solid $primary
}
</style>
