<template>
<div class="q-ma-md q-pa-md">
  <div class="column items-center justify-center">
    <div class="text-h6 text-center">¿Donde estará mi taller?</div>
    <div class="row justify-center q-mt-md">
      <img src="nopublicidad.jpg" style="width: 80%;height:200px; border-radius: 15px">
    </div>

    <div class="row q-pa-sm">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="text-caption">Pais</div>
        <q-select filled v-model="form.pais" label="País" outlined dense :options="['Argentina', 'Chile']" error-message="Seleccione un País" :error="$v.form.pais.$error" @blur="$v.form.pais.$touch()" />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="text-caption">Ciudad</div>
        <q-select filled v-model="form.ciudad" label="Ciudad" outlined dense :options="['ciudad1', 'ciudad2']" error-message="Seleccione una ciudad" :error="$v.form.ciudad.$error" @blur="$v.form.ciudad.$touch()" />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="text-caption">Dirección física del taller</div>
          <q-input
            v-model="form.direccion"
            placeholder="Mi direccion #1234"
            outlined
            filled
            dense
            error-message="Ingrese su Direccion"
            :error="$v.form.direccion.$error"
            @blur="$v.form.direccion.$touch()"
          />
      </div>
    </div>
    <div class="row justify-center" style="width:100%">
      <q-btn @click="next()" color="primary" label="Siguiente" rounded no-caps style="width:70%" class="q-py-xs"/>
    </div>
    </div>
</div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
export default {
  props: ['form', 'panel'],
  data () {
    return {

    }
  },
  validations () {
    return {
      form: {
        pais: { required, maxLength: maxLength(40) },
        ciudad: { required },
        direccion: { required }
      }
    }
  },
  mounted () {
  },
  methods: {
    async next () {
      if (this.panel.panel === 'parte_tres_proveedor_datos') {
        this.$q.loading.show()
        this.$v.form.$touch()
        if (!this.$v.form.pais.$error && !this.$v.form.ciudad.$error && !this.$v.form.direccion.$error) {
          this.panel.panel = 'parte_cuatro_proveedor_datos'
        }
      }
      this.$q.loading.hide()
    }
  }
}
</script>

<style>

</style>>
