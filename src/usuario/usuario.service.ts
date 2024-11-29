
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs'
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaClient } from '@prisma/client';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';
import { env } from 'process';


@Injectable()
export class UsuarioService extends PrismaClient implements OnModuleInit{
  
  constructor (private readonly configService:ConfigService,){
    super();
    
   }
  async onModuleInit() {
   await this.$connect();
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 5); // Cifra la contraseña
  createUsuarioDto.password = hashedPassword;
  

  
    return this.usuarios.create({
      data:createUsuarioDto,

      
    });
  }

  async findAll(isActive: boolean = true, page: number=1 ,limit: number=10) {
   
    try{
const skip =(page -1)*limit;

   const usuario= await this.usuarios.findMany(
    {
      where:{
        isDeleted:!isActive
      },
      skip:skip,
      take:limit,
    }

   );
   const total =await this.usuarios.count({
    where:{
      isDeleted: !isActive,
    }
        
   });
   return {
    data:usuario,
    meta:{
      total,
      page,
      limit,
      totalPages:Math.ceil(total/limit),
    },
   };
  
      }  catch(error: any){
      console.error('Error en finMany :',error);
      throw error;
    }
  }

  async findOne(cedula:string) {
    
    const usuario=await this.usuarios.findFirst({
    where :{ 
      cedula
  },     
    });
    if(!usuario){
      throw new NotFoundException(`No se encontró un usuario con la cédula ${cedula}`)
    }
    return  usuario
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario =await this.usuarios.findUnique({ where :{
      id
    }});
    if(!usuario){
      throw new NotFoundException ('el usuario con el id  no encuentra ')
    }
    return this.usuarios.update({
      where:{id},
      data:updateUsuarioDto
    })
  }

   async remove(id: number) {
    
    try{

    
    const usuario = await this.usuarios.findUnique({ where: { id } });
    if (!usuario) {
      throw new NotFoundException('El usuario con el ID proporcionado no existe');
    }
  
    return this.usuarios.update({
      where: { id },
      data: { isDeleted: true }, // Marcamos como eliminado
  
  
    
    }
  );
}catch(error){
  throw new InternalServerErrorException('Error al conectar con la base de datos');
}}  


async sendPasswordReset(email : string) {
  
  // Obtén el valor de JWT_SECRET
  const secret = this.configService.get<string>(env.JWT_SECRET); 
  if (!secret) {
    throw new Error('JWT_SECRET no está configurado');
  }

  // Genera el token
  const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
const randompart =token.substring(0,Math.floor(Math.random()*(7-5+1))+5);
 
console.log(`Parte aleatoria del token generada: ${randompart}`);
console.log(`correo que fue enviado : ${email}`)


return randompart;

  // Aquí enviarías el token al correo electrónico
}





// login 
async login(cedula:string,password:string ){

  if(!cedula||!password){
    throw new BadRequestException('Cédula y contraseña son requeridas.');
  }
  const user=await this.usuarios.findFirst({
    where: { cedula,password, isDeleted:false
    },


  });
  if(!user){
    console.error( `Usuario no encontrado para cédula: ${cedula}` )
    throw new NotFoundException(' usuario no encontrado');
  }


  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log( password)
  console.log( user.password)
  console.log( isPasswordValid)
  if (isPasswordValid) {
 
    throw new UnauthorizedException('Credenciales incorrectas');
  }
 const secret = this.configService.get<string>('JWT_SECRET');
  if (!secret) {
 throw new InternalServerErrorException('JWT_SECRET no está configurado');
 }

 const token = jwt.sign({ id: user.id, cedula: user.cedula }, secret, {
   expiresIn: '1h',
 });

    console.log(`Inicio de sesión exitoso para usuario: ${user.cedula}`)
        return { message: 'Inicio de sesión exitoso.', token }
};


}