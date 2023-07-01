// import {
//   CloseButton,
//   Flex,
//   Link,
//   Select,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import { PriceTag } from "./PriceTag";
// import { CartProductMeta } from "./CartProductMeta";

// export const CartItem = (props) => {

//   return (
//     <Flex
//       direction={{
//         base: "column",
//         md: "row",
//       }}
//       justify="space-between"
//       align="center"
//     >
//       <CartProductMeta
//         name={name}
//         description={description}
//         image={imageUrl}
//         isGiftWrapping={isGiftWrapping}
//       />

//       <Flex
//         width="full"
//         justify="space-between"
//         display={{
//           base: "none",
//           md: "flex",
//         }}
//       >
//         <PriceTag price={price} currency={currency} />
//         <CloseButton
//           aria-label={`Delete ${name} from cart`}
//           onClick={onClickDelete}
//         />
//       </Flex>
//     </Flex>
//   );
// };
