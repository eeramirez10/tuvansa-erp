import React from "react"
import { InventoryIdentity } from "../types/inventory.types"
import { Field } from "./ui/Field"


type Props = {
  identity: InventoryIdentity | undefined
}


export const InventoryIdentityPanel: React.FC<Props> = ({ identity }) => {

  return (

    <>

      <div className="grid gap-y-[4px] text-[11px] font-bold text-[#2f3a44]">
        <div className="grid grid-cols-[86px_124px_52px_1fr] items-center gap-x-[6px]">
          <span className="text-right">Código</span>
          <Field value={identity?.code ?? ""} />
          <span />

        </div>

        <div className="grid grid-cols-[86px_1fr] items-center gap-x-[6px]">
          <span className="text-right">Descripción</span>
          <Field value={identity?.description ?? ""} />
        </div>

        <div className="grid grid-cols-[86px_38px_130px_1fr] items-center gap-x-[6px]">
          <span className="text-right">Unidad</span>
          <Field value={identity?.unitCode ?? ""} />
          <Field
            value={`${identity?.unitCode ?? ""}   ${identity?.unitDescription ?? ""}        ▾`}
          />
          <div className="flex items-center gap-[12px] text-[11px] font-semibold text-[#5a646f]">
            <label className="inline-flex items-center gap-[4px]">
              <span className="inline-block h-[14px] w-[14px] border border-[#aeb3b8] bg-[#ececec]" />
              Color y talla
            </label>
            <label className="inline-flex items-center gap-[4px]">
              <span className="inline-block h-[14px] w-[14px] border border-[#aeb3b8] bg-[#ececec]" />
              Foto
            </label>
          </div>
        </div>
      </div>

      <div className="mt-[3px] flex flex-wrap gap-x-[16px] text-[11px] font-semibold text-[#636d78]">
        <span>○ M.P.</span>
        <span>○ P.T.</span>
        <span>○ Juego</span>
        <span>○ Ensamble</span>
        <span>○ Servicio</span>
        <span>○ Gastos POS</span>
        <span>○ Prepack</span>
      </div>


    </>


  )

}