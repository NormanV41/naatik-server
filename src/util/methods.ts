import { Request } from 'express';

export const getQueryParams = (request: Request) => {
  const query = request.query as {
    order?: string;
    where?: string;
    limit?: string;
    include?: string;
  };
  let limit: number | undefined;
  if (query.limit) {
    limit = Number.parseInt(query.limit, 10);
  }
  let sort = '';
  if (query.order) {
    const order = JSON.parse(query.order) as string[];
    order.forEach((el, index, array) => {
      if (index === array.length - 1) {
        sort += el;
      } else {
        sort += el + ' ';
      }
    });
  }
  let filter: { active?: boolean } = {};
  if (query.where) {
    filter = JSON.parse(query.where) as { active: boolean };
  }
  const include = query.include
    ? (JSON.parse(query.include) as string[]).map((el) => {
        return {
          path: el
        };
      })
    : [];
  return {
    limit,
    sort,
    filter,
    include
  };
};

export const setFileName = (request: Request, propertyToSet: string) => {
  let array: string[] = [];
  if (request.file) {
    array = request.file.path.split('/');
  }
  if (array.length > 1) {
    request.body[propertyToSet] = array[array.length - 1];
  }
};
