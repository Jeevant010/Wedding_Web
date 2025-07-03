import React, { useState, useEffect } from 'react';
import { footerAPI, handleAPIError } from '../utils/api';
import { 
    IoLogoInstagram, 
    IoLogoFacebook, 
    IoLogoYoutube, 
    IoLogoTwitter, 
    IoLogoLinkedin,
    IoCall,
    IoMail,
    IoLocation
} from 'react-icons/io5';

const Footer = () => {
    const [footerData, setFooterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                setLoading(true);
                const response = await footerAPI.getData();
                setFooterData(response.data.data);
                setError(null);
            } catch (err) {
                setError(handleAPIError(err));
                console.error('Error fetching footer data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFooterData();
    }, []);
    const getSocialIcon = (iconName) => {
        const iconMap = {
            instagram: IoLogoInstagram,
            facebook: IoLogoFacebook,
            youtube: IoLogoYoutube,
            twitter: IoLogoTwitter,
            linkedin: IoLogoLinkedin
        };
        const IconComponent = iconMap[iconName];
        return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
    };

    // Loading state
    if (loading) {
        return (
            <footer className="bg-black text-white py-16 px-4 md:px-8 shadow-2xl">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                            <div className="lg:col-span-2 space-y-4">
                                <div className="h-8 bg-gray-800 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                                <div className="flex space-x-4">
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} className="w-10 h-10 bg-gray-800 rounded-full"></div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-6 bg-black-500 rounded w-1/2"></div>
                                <div className="space-y-2">
                                    {[1,2,3].map(i => (
                                        <div key={i} className="h-4 bg-gray-800 rounded"></div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-6 bg-gray-800 rounded w-1/3"></div>
                                <div className="space-y-2">
                                    {[1,2,3].map(i => (
                                        <div key={i} className="h-4 bg-gray-800 rounded"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

    // Error state
    if (error || !footerData) {
        return (
            <footer className="bg-black text-white py-16 px-4 md:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-gray-400">
                        {error || 'Unable to load footer data'}
                    </p>
                </div>
            </footer>
        );
    }

    return (
        <footer className="bg-black text-white py-16 px-4 md:px-8 mb-20 rounded-3xl mt-8">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl md:text-3xl font-light mb-4 tracking-wide">
                            {footerData?.companyInfo?.name || 'The Wedding Filmer'}
                        </h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            {footerData?.companyInfo?.tagline || 'Capturing Love Stories'}
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {footerData?.socialLinks?.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300 group"
                                    aria-label={social.platform || social.name}
                                >
                                    <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                                        {getSocialIcon(social.icon)}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h4 className="text-lg font-medium mb-6 tracking-wide">Contact Us</h4>
                        <div className="space-y-4">
                            {/* Phone */}
                            <div className="flex items-center space-x-3">
                                <IoCall className="w-5 h-5 text-gray-400" />
                                <a 
                                    href={`tel:${footerData?.contactInfo?.phone || ''}`}
                                    className="text-gray-300 hover:text-white transition-colors duration-300"
                                >
                                    {footerData?.contactInfo?.phone || '+1 (555) 123-4567'}
                                </a>
                            </div>
                            
                            {/* Email */}
                            <div className="flex items-center space-x-3">
                                <IoMail className="w-5 h-5 text-gray-400" />
                                <a 
                                    href={`mailto:${footerData?.contactInfo?.email || ''}`}
                                    className="text-gray-300 hover:text-white transition-colors duration-300"
                                >
                                    {footerData?.contactInfo?.email || 'hello@theweddingfilmer.com'}
                                </a>
                            </div>
                            
                            {/* Address */}
                            <div className="flex items-start space-x-3">
                                <IoLocation className="w-5 h-5 text-gray-400 mt-1" />
                                <div className="text-gray-300">
                                    <p>{footerData?.contactInfo?.address?.line1 || '123 Creative Studio Lane'}</p>
                                    <p>{footerData?.contactInfo?.address?.line2 || 'Photography District'}</p>
                                    <p>{footerData?.contactInfo?.address?.city || 'New Delhi, DL 2001'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-lg font-medium mb-6 tracking-wide">Legal</h4>
                        <div className="space-y-3">
                            {(footerData?.legalLinks || []).map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className="block text-gray-300 hover:text-white transition-colors duration-300"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            {footerData?.companyInfo?.copyright || '© 2024 LensLove Photography. All rights reserved.'}
                        </p>
                        <div className="flex space-x-6 text-sm">
                            {(footerData?.legalLinks || []).map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className="text-gray-400 hover:text-white transition-colors duration-300"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
