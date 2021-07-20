<template>
  <div>
    <div>
      <q-img src="nopublicidad.jpg" spinner-color="white" style="width:100%; height:200px">
        <div class="text-h6 absolute-bottom text-center bg-transparent">Solicitudes</div>
      </q-img>
    </div>

    <div class="q-pa-md">
      <div class="text-h6">Solicitudes activas</div>
      <div class="text-caption text-grey-9 q-pb-md">A continuación podrás ver todas las solicitudes que has creado.</div>
      <div class="column items-center q-gutter-sm" v-if="activas.length">
        <q-card v-for="(item, index) in activas" :key="index" style="width:100%;height:270px;" @click="$router.push('/descripcionsolicitud/' + item._id)">
            <div class="row justify-end items-center q-pa-xs">
              <div class="text-caption text-grey-8 q-pr-xs">Nivel de requerimiento</div>
              <div class="row q-gutter-xs">
                <q-radio v-model="item.colorRadio" keep-color size="xs" dense val="red" color="red" />
                <q-radio v-model="item.colorRadio" keep-color size="xs" dense val="orange" color="orange" />
                <q-radio v-model="item.colorRadio" keep-color size="xs" dense val="blue" color="blue" />
              </div>
            </div>
            <div :class="'text-white q-py-xs q-px-md text-right text-bold bg-'+item.colorRadio" style="widyh:100%">{{item.name}}</div>
            <div class="row q-py-md">
              <div class="column items-center justify-center" style="width:40%">
                <q-avatar size="90px">
                  <img :src="item.images ? baseu + '/' + item.images[0] : 'noimgpro.png'" spinner-color="white">
                </q-avatar>
                <div class="q-pl-sm q-mt-xs" style="width:100%">
                  <div class="row items-center">
                    <q-icon size="xs" name="person" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.full_name}} {{item.creador.last_name}}</div>
                  </div>
                  <div class="row q-mt-sm items-center">
                    <q-icon size="xs" name="phone" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.phone}}</div>
                  </div>
                  <div class="row q-mt-sm items-center">
                    <q-icon size="xs" name="place" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.direccion}}</div>
                  </div>
                </div>
              </div>
              <div style="width:60%">
                <div class="text-h6 q-mb-xs">{{item.name}}</div>
                <div class="row q-mb-md" style="height:50px; width:100%">
                  <div class="col-12 q-pr-xs text-grey-9 text-caption ellipsis-3-lines">{{item.descripcion}}</div>
                </div>
                <div class="row items-center">
                  <div class="text-caption text-grey-9 ellipsis"><b>Estado de solicitud:</b> {{item.status}}</div>
                </div>
                <div class="row items-center no-wrap q-mt-xs" style="width:100%">
                  <img :src="item.categoriaInfo.icons" style="width:18px" />
                  <div class="text-grey-8 q-pl-xs ellipsis">{{item.categoriaInfo.name}}</div>
                </div>
              </div>
            </div>
            <div class="absolute-bottom-right text-grey-8 q-pa-sm text-caption">Fecha de Solicitud: {{item.fechaCreacion}} </div>
          </q-card>
      </div>
      <q-card v-else class="shadow-2 q-ma-md q-pa-md">
        <div class="text-center text-subtitle1">Actualmente sin solicitudes...</div>
      </q-card>
    </div>

    <div class="q-pa-md">
      <div class="text-h6">Solicitudes completadas</div>
      <div class="text-caption text-grey-9 q-pb-md">Historial de solicitudes realizadas y completadas con éxito.</div>
      <div class="column items-center q-gutter-sm" v-if="completas.length">
        <q-card v-for="(item, index) in completas" :key="index" style="width:100%;height:270px;" @click="$router.push('/descripcionsolicitud/' + item._id)">
            <div class="row justify-end items-center q-pa-xs">
              <div class="text-caption text-grey-8 q-pr-xs">Nivel de requerimiento</div>
              <div class="row q-gutter-xs">
                <q-radio v-model="item.colorRadio" keep-color size="xs" dense val="red" color="red" />
                <q-radio v-model="item.colorRadio" keep-color size="xs" dense val="orange" color="orange" />
                <q-radio v-model="item.colorRadio" keep-color size="xs" dense val="blue" color="blue" />
              </div>
            </div>
            <div :class="'text-white q-py-xs q-px-md text-right text-bold bg-'+item.colorRadio" style="widyh:100%">{{item.name}}</div>
            <div class="row q-py-md">
              <div class="column items-center justify-center" style="width:40%">
                <q-avatar size="90px">
                  <img :src="item.images ? baseu + '/' + item.images[0] : 'noimgpro.png'" spinner-color="white">
                </q-avatar>
                <div class="q-pl-sm q-mt-xs" style="width:100%">
                  <div class="row items-center">
                    <q-icon size="xs" name="person" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.full_name}} {{item.creador.last_name}}</div>
                  </div>
                  <div class="row q-mt-sm items-center">
                    <q-icon size="xs" name="phone" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.phone}}</div>
                  </div>
                  <div class="row q-mt-sm items-center">
                    <q-icon size="xs" name="place" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.direccion}}</div>
                  </div>
                </div>
              </div>
              <div style="width:60%">
                <div class="text-h6 q-mb-xs">{{item.name}}</div>
                <div class="row q-mb-md" style="height:50px; width:100%">
                  <div class="col-12 q-pr-xs text-grey-9 text-caption ellipsis-3-lines">{{item.descripcion}}</div>
                </div>
                <div class="row items-center">
                  <div class="text-caption text-grey-9 ellipsis"><b>Estado de solicitud:</b> {{item.status}}</div>
                </div>
                <div class="row items-center no-wrap q-mt-xs" style="width:100%">
                  <img :src="item.categoriaInfo.icons" style="width:18px" />
                  <div class="text-grey-8 q-pl-xs ellipsis">{{item.categoriaInfo.name}}</div>
                </div>
              </div>
            </div>
            <div class="absolute-bottom-right text-grey-8 q-pa-sm text-caption">Fecha de Solicitud: {{item.fechaCreacion}} </div>
          </q-card>
      </div>
      <q-card v-else class="shadow-2 q-ma-md q-pa-md">
        <div class="text-center text-subtitle1">Actualmente sin solicitudes...</div>
      </q-card>
    </div>

    <!-- <q-card class="q-pa-md bordes" v-for="(item, index) in data" :key="index" v-ripple >
        <div class="row justify-between">
          <div @click="$router.push('/descripcionsolicitud/' + item._id)" class="col-4">
            <q-img :src="item.images ? baseu + '/' + item.images[0] : 'noimgpro.png'" style="width:100px; height: 80px;" />
          </div>
          <div @click="$router.push('/descripcionsolicitud/' + item._id)" class="col-6">
              <q-scroll-area
                horizontal
                style="height: 27px"
              >
                <div class="text-subtitle2 text-weight-bolder">{{item.name}}</div>
              </q-scroll-area>
              <div class="text-caption">Caracter:</div>
              <q-chip text-color="white" :label="item.necesidad" :color="item.necesidad === 'Urgente (1 a 3 Horas)' ? 'red' : item.necesidad === 'Medio (5 a 24 Horas)' ? 'amber-7' : 'green-14'" />
          </div>
          <q-separator vertical color="black" />
          <div class="column justify-around">
            <q-btn round flat color="white" size="sm" text-color="black" icon="edit" @click="editSolicitud(item._id)" />
            <q-separator color="black" />
            <q-btn round flat color="white" size="sm" text-color="red" icon="delete" @click="deleteSolicitud(item._id)" />
          </div>
        </div>
      </q-card> -->
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      baseu: '',
      activas: [],
      completas: []
    }
  },
  mounted () {
    this.getSolicitudes()
    this.baseu = env.apiUrl + '/necesidad_img'
  },
  methods: {
    getSolicitudes () {
      this.$api.get('user_info').then(res => {
        if (res) {
          var id = res._id
          this.$api.get('necesidad_by_user_id/' + id).then(v => {
            if (v) {
              this.activas = v
              this.completas = v
            }
          })
        }
      })
    },
    editSolicitud (id) {
      this.$router.push('/editar_solicitud/' + id)
    },
    deleteSolicitud (id) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas eliminar esta solicitud?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.delete('necesidad/' + id).then(res => {
          if (res) {
            this.$q.notify({
              color: 'positive',
              message: 'Eliminado Correctamente'
            })
            this.getSolicitudes()
          }
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
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
.estilo-titulos {
  background-color: #fff599;
  width: 250px;
  border-radius: 12px
}
</style>
