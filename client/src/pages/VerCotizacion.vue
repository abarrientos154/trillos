<template>
  <div>
    <div class="text-primary text-center text-bold q-my-md text-h5">{{infoCot.status !== 'Presupuesto' ? '* Cotización *' : '* Presupuesto *'}}</div>
    <q-separator inset />
    <div class="column q-ma-md">
      <div class="row items-center">
        <div class="text-subtitle2 text-grey-9 q-ml-sm">* Servicios *</div>
      </div>
      <div class="row justify-center">
        <div class="col-6 title-table q-pa-xs">Servicio</div>
        <div class="col-6 title-table q-pa-xs">Precio</div>
      </div>
      <div class="row justify-center q-mt-sm" v-for="(item, index) in cotization.servicios" :key="index">
        <div class="col-6 title-table-product q-pa-xs">{{item.servicio}}</div>
        <div class="col-6 title-table-product q-pa-xs">{{item.precio}}</div>
      </div>
    </div>
    <q-separator inset />
    <div class="row justify-around q-my-md">
      <div class="text-h6 text-primary">Total</div>
      <div class="text-h6 text-primary">$ {{cotization.total}}</div>
    </div>
      <div v-if="statusTerminadoclient" class="column items-center justify-center">
        <q-btn label="Calificar" color="primary" push glossy style="width:110px;height:40px" @click="modelcliente=true" />
      </div>
      <div v-if="statusTerminadoProv" class="column items-center justify-center">
        <q-btn label="Calificar" color="primary" push glossy style="width:110px;height:40px" @click="modelproveedor=true" />
      </div>
    <div v-if="comentarios">
      <q-card class="bg-white bordes q-pa-md q-ma-sm shadow-11" style="border-radius:25px">
        <div class="text-h7 text-grey-9 text-bold text-center">* Opinión del cliente *</div>
          <div class="q-mb-md q-mt-md" v-if="data">
              <div class="q-mt-sm q-mb-lg">
                <q-item class="q-mt-md">
                  <q-item-section>
                    <q-item-label>{{data.calificador_info ? data.calificador_info.full_name : ''}}</q-item-label>
                    <q-item-label caption lines="5">{{data.comentario}}</q-item-label>
                  </q-item-section>
                  <q-item-section side top>
                    <div class="row justify-end q-mt-md items-center">
                      <div class="text-subtitle1 text-bold"> {{data.rating_tienda}} </div>
                      <q-icon name="star" color="orange" class="q-ml-sm" size="30px" />
                    </div>
                  </q-item-section>
                </q-item>
                <div class="text-caption text-grey-7 text-right">{{data.created_at}}</div>
              </div>
          </div>
          <div v-else>
            <div class="text-center q-pt-md text-caption">
              Actualmente sin Calificar...
            </div>
          </div>
        </q-card>
    </div>

    <div v-if="comentarios2">
      <q-card class="bg-white bordes q-pa-md q-ma-sm shadow-11" style="border-radius:25px">
        <div class="text-h7 text-grey-9 text-bold text-center">* Calificación del proveedor *</div>
          <div class="q-mb-md q-mt-md" v-if="data">
            <q-item class="q-my-md">
              <q-item-section>
                <q-item-label class="text-bold">{{data.calificador_info ? data.calificador_info.full_name : ''}}</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <div class="row justify-end q-mt-sm items-center">
                  <div class="text-subtitle1 text-bold"> {{data.rating_cliente}} </div>
                  <q-icon name="star" color="orange" class="q-ml-sm" size="30px" />
                </div>
              </q-item-section>
            </q-item>
            <div class="text-caption text-grey-7 text-right">{{data.created_at}}</div>
          </div>
          <div v-else>
            <div class="text-center q-pt-md text-caption">
              Actualmente sin Calificar...
            </div>
          </div>
        </q-card>
    </div>

    <div v-if="rol === 2 && btnClient" class="row justify-center q-my-md">
      <q-btn class="q-mr-md" label="Rechazar" color="red" push glossy style="width:110px;height:40px" @click="rechazarCot()" />
      <q-btn label="Aprobar" color="primary" push glossy style="width:110px;height:40px" @click="aprobarCot()" />
    </div>

    <q-dialog persistent v-model="statusAprobado" style="width:100%">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-bold text-primary">Cotizacion Aprobada</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="q-px-xs text-subtitle2">Ingrese la fecha de finalización del trabajo</div>
          <q-input outlined v-model="fecha_termino" mask="date" placeholder="aaaa/mm/dd" :error="$v.fecha_termino.$error" error-message="Este campo es requerido"  @blur="$v.fecha_termino.$touch()">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="fecha_termino">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div class="row justify-center q-mt-md">
            <q-btn class="q-mr-md" label="Iniciar" color="positive" push glossy @click="enviarFecha()" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="statusIniciado" style="width:100%">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-bold text-primary">{{ today > fecha ? 'Proceso Atrasado' : 'Proceso Iniciado'}}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="q-px-xs q-pb-md text-subtitle1">La fecha de culminación del trabajo es:</div>
          <div class="text-h6 text-center">{{fecha}}</div>
        </q-card-section>
        <q-card-section v-if="rol === 3" class="row justify-center q-my-md">
          <q-btn v-if="posponeBtn" class="q-mr-md" label="Posponer" color="primary" push glossy style="width:110px;height:40px" @click="statusIniciado = false, statusAprobado = true" />
          <q-btn label="Finalizar" color="positive" push glossy style="width:110px;height:40px" @click="terminarTrabajo()" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog persistent v-model="modelcliente" style="width:100%">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-bold text-primary">Trabajo Finalizado</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="q-px-xs text-subtitle1">Califícanos y deja un comentario.</div>
          <div class="row justify-center">
            <q-rating
              v-model="form.rating_tienda"
              max="5"
              size="3em"
              color="yellow"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              no-dimming
            />
          </div>
          <q-input
            v-model="form.comentario"
            outlined
            type="textarea"
          />
          <div class="row justify-center q-mt-md">
            <q-btn class="q-mr-md" label="Calificar" color="primary" push glossy @click="calificar('proveedor')" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog persistent v-model="modelproveedor" style="width:100%">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-bold text-primary">Trabajo Finalizado</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="q-px-xs text-subtitle1">Debes calificar al cliente.</div>
          <div class="row justify-center">
            <q-rating
              v-model="form.rating_cliente"
              max="5"
              size="3em"
              color="yellow"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              no-dimming
            />
          </div>
          <div class="row justify-center q-mt-md">
            <q-btn class="q-mr-md" label="Calificar" color="primary" push glossy @click="calificar('cliente')" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import moment from 'moment'
export default {
  data () {
    return {
      id: this.$route.params.id,
      form: {},
      today: null,
      statusAprobado: false,
      statusIniciado: false,
      statusTerminadoProv: false,
      statusTerminadoclient: false,
      modelcliente: false,
      modelproveedor: false,
      posponeBtn: false,
      btnClient: false,
      rating_tienda: 0,
      rating_cliente: 0,
      infoCot: {},
      comentario: '',
      fecha_termino: '',
      fecha: '',
      rol: 0,
      data: {},
      comentarios: false,
      comentarios2: false,
      cotization: {
      }
    }
  },
  validations: {
    fecha_termino: { required }
  },
  mounted () {
    this.getRecords()
    this.getCotization()
    this.consultaropinion()
  },
  methods: {
    getRecords () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
        }
      })
    },
    consultaropinion () {
      this.form.necesidad_id = this.$route.params.necesidad_id
      this.$api.get('opiniones/' + this.$route.params.necesidad_id).then(res => {
        this.data = res[0]
      })
    },
    getCotization () {
      this.$api.get('cotization_by_id/' + this.id).then(v => {
        if (v) {
          this.infoCot = v
          this.cotization = v.cotizacion
          this.today = moment().format('YYYY/MM/DD')
          if (v.status === 'Cotizado') {
            this.btnClient = true
          }
          if (v.status === 'Rechazado' && this.rol === 3) {
            this.$q.dialog({
              title: '¡Atención!',
              message: `Esta cotización ha sido rechazada. Puedes volver a cotizar si lo deseas. Por motivo de: ${this.infoCot.motivo}`
            }).onOk(() => {

            })
          }
          if (v.status === 'Aprobado' && this.rol === 2) {
            this.$q.dialog({
              title: '¡Atención!',
              message: 'Esta cotización ha sido aprobada. Debe esperar por la respuesta del proveedor.'
            }).onOk(() => {

            })
          }
          if (v.status === 'Aprobado' && this.rol === 3) {
            this.statusAprobado = true
          }
          if (v.status === 'Iniciado' || v.status === 'Atrasado') {
            this.statusIniciado = true
            this.fecha = v.fecha_termino
            if (this.fecha <= this.today) {
              this.posponeBtn = true
            }
          }
          if (v.status === 'Terminado' && this.rol === 2 && !v.calificado) {
            this.statusTerminadoclient = true
          }
          if (v.status === 'Terminado' && this.rol === 2 && v.calificado) {
            this.comentarios2 = true
          }
          if (v.status === 'Terminado' && this.rol === 3 && !v.calificado) {
            this.statusTerminadoProv = true
          }
          if (v.status === 'Terminado' && this.rol === 3) {
            this.comentarios = true
          }
        }
      })
    },
    calificar (val) {
      this.form.necesidad_id = this.$route.params.necesidad_id
      if (val === 'proveedor') {
        this.$api.post('opinion/' + this.$route.params.necesidad_id + '/cliente/' + this.id, this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Opinion enviada con Exito',
              color: 'positive'
            })
          }
        })
      } else {
        this.$api.post('opinion/' + this.$route.params.necesidad_id + '/proveedor/' + this.id, this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Calificacion enviada con Exito',
              color: 'positive'
            })
          }
        })
      }
    },
    terminarTrabajo () {
      this.$q.loading.show({
        message: 'Culminando el proceso, Por Favor Espere...'
      })
      this.$api.put('new_status/' + this.id, { status: 'Terminado' }).then((res) => {
        this.$q.loading.hide()
        this.statusIniciado = false
        this.statusTerminadoProv = true
      })
    },
    aprobarCot () {
      this.$q.loading.show({
        message: 'Aprobando cotización, Por Favor Espere...'
      })
      this.$api.put('new_status/' + this.id, { status: 'Aprobado' }).then((res) => {
        this.$q.loading.hide()
        this.$router.push('/mis_cotizaciones')
      })
    },
    rechazarCot () {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas rechazar esta cotización? ingrese el motivo del rechazo',
        cancel: true,
        persistent: true,
        prompt: {
          motivo: ''
        }
      }).onOk(data => {
        this.$api.put('new_status/' + this.id, { status: 'Rechazado', motivo: data }).then((res) => {
          this.$router.push('/mis_cotizaciones')
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    },
    enviarFecha () {
      this.$v.$touch()
      if (!this.$v.fecha_termino.$error) {
        this.$api.put('fecha_de_termino/' + this.id, { fecha_termino: this.fecha_termino }).then((res) => {
          this.$router.push('/mis_cotizaciones')
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border-top: 6px solid $primary
}
.title-table {
  border-radius: 12px;
  background-color: #b3e3f4;
  color: #529cb3;
  border: 1px solid grey;
}
.title-table-product {
  border-radius: 12px;
  background-color: #888585;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(255, 255, 255);
}
</style>
