export class Venta {
    constructor(
        public _id: string,
        public sessionId: string,
        public tbk_creditcard: string,
        public tbk_mac: string,
        public tbk_vci: string,
        public tbk_orden_tienda: string,
        public tbk_number_cuotas: string,
        public tbk_tipo_pago: string,
        public tbk_cod_auth: string,
        public tbk_fecha_transaccion: string,
        public tbk_fechacontable: string,
        public tbk_ordencompra: string,
        public tbk_respuesta: string,
        public tbk_codigo_comercio: string,
        public tbk_tipo_transaccion: string,
        public tbk_bp_resultado: string,
        public tbk_pago: string,    
    ) { }
}