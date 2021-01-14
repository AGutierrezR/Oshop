/*
 * Retorna un array de objectos con la propiedad $key
 *
 * @param  items Array de elementos que vienen del servidor
 * @return       Un objecto de tipo { $key: ..., ...properties}
 */
export const toObjectWithKey = (arr: any[]) =>
  arr.map((item) => {
    return {
      $key: item.payload.key,
      ...item.payload.val(),
    };
  });
